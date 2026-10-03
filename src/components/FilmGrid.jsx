import Grid from '@mui/material/Grid2';
import FilmCard from './FilmCard.jsx';

export default function FilmGrid({ films, onOpen }) {
  return (
    <Grid container spacing={2}>
      {films.map((film) => (
        <Grid key={film.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <FilmCard film={film} onOpen={onOpen} />
        </Grid>
      ))}
    </Grid>
  );
}