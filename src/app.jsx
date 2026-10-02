import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import useFetch from './hooks/useFetch.js';
import { getFilms } from './services/ghibliApi.js';
import FilmGrid from './components/FilmGrid.jsx';
import { ErrorMessage, Loading } from './components/StatusMessage.jsx';

export default function App() {
  const { data: films, loading, error } = useFetch(getFilms, []);

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
        {films && <FilmGrid films={films} />}
      </Container>
    </>
  );
}
