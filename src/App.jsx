import { useMemo, useReducer, useState } from 'react';
import { AppBar, Badge, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import useFetch from './hooks/useFetch.js';
import useFavorites from './hooks/useFavorites.js';
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
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [tab, setTab] = useState('catalog');
  const [selectedFilm, setSelectedFilm] = useState(null);

  const directors = useMemo(
    () => [...new Set((films ?? []).map((f) => f.director))].sort(),
    [films]
  );

  const visibleFilms = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return (films ?? [])
      .filter((f) => !term || f.title.toLowerCase().includes(term))
      .filter((f) => filters.director === 'all' || f.director === filters.director)
      .sort(sorters[filters.sortBy]);
  }, [films, filters]);

  const favoriteFilms = useMemo(
    () => (films ?? []).filter((f) => favorites.includes(f.id)),
    [films, favorites]
  );

  const gridProps = { isFavorite, onToggleFavorite: toggleFavorite, onOpen: setSelectedFilm };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h5" component="h1">Ghibli Explorer</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 3 }}>
          <Tab value="catalog" label="Catálogo" />
          <Tab
            value="favorites"
            label={<Badge color="secondary" badgeContent={favorites.length} sx={{ pr: 1.5 }}>Favoritos</Badge>}
          />
        </Tabs>

        {loading && <Loading label="Carregando filmes..." />}
        {error && <ErrorMessage error={error} onRetry={() => window.location.reload()} />}

        {films && tab === 'catalog' && (
          <Box>
            <FilterBar filters={filters} directors={directors} dispatch={dispatchFilters} />
            {visibleFilms.length === 0 ? (
              <EmptyMessage title="Nenhum filme encontrado" hint="Altere a busca ou limpe os filtros." />
            ) : (
              <FilmGrid films={visibleFilms} {...gridProps} />
            )}
          </Box>
        )}

        {films && tab === 'favorites' && (
          favoriteFilms.length === 0 ? (
            <EmptyMessage title="Você ainda não favoritou nenhum filme" hint="Toque na estrela de um filme no catálogo." />
          ) : (
            <FilmGrid films={favoriteFilms} {...gridProps} />
          )
        )}
      </Container>

      {selectedFilm && (
        <FilmDetailDialog
          film={selectedFilm}
          onClose={() => setSelectedFilm(null)}
          isFavorite={isFavorite(selectedFilm.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}
