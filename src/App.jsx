import { useMemo, useReducer, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import useFetch from './hooks/useFetch.js';
import { getFilms } from './services/ghibliApi.js';
import { filtersReducer, initialFilters } from './reducers/filtersReducer.js';
import FilterBar from './components/FilterBar.jsx';
import FilmGrid from './components/FilmGrid.jsx';
import FilmDetailDialog from './components/FilmDetailDialog.jsx';
import { EmptyMessage, ErrorMessage, Loading } from './components/StatusMessage.jsx';

const sorters = {
  title: (a, b) => a.title.localeCompare(b.title),
  year: (a, b) => Number(b.release_date) - Number(a.release_date),
  score: (a, b) => Number(b.rt_score) - Number(a.rt_score),
  duration: (a, b) => Number(b.running_time) - Number(a.running_time),
};

export default function App() {
  const { data: films, loading, error } = useFetch(getFilms, []);
  const [filters, dispatchFilters] = useReducer(filtersReducer, initialFilters);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const directors = useMemo(
    () => [...new Set((films ?? []).map((f) => f.director))].sort(),
    [films]
  );

  // Filtra e ordena só quando films ou filters mudam
  const visibleFilms = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return (films ?? [])
      .filter((f) => !term || f.title.toLowerCase().includes(term))
      .filter((f) => filters.director === 'all' || f.director === filters.director)
      .sort(sorters[filters.sortBy]);
  }, [films, filters]);

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h5" component="h1">Ghibli Explorer</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        {loading && <Loading label="Carregando filmes..." />}
        {error && <ErrorMessage error={error} onRetry={() => window.location.reload()} />}

        {films && (
          <>
            <FilterBar filters={filters} directors={directors} dispatch={dispatchFilters} />
            {visibleFilms.length === 0 ? (
              <EmptyMessage title="Nenhum filme encontrado" hint="Altere a busca ou limpe os filtros." />
            ) : (
              <FilmGrid films={visibleFilms} onOpen={setSelectedFilm} />
            )}
          </>
        )}
      </Container>

      {selectedFilm && (
        <FilmDetailDialog film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}
    </>
  );
}
