import { Box, Card, CardActionArea, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';

export default function FilmCard({ film, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardActionArea onClick={() => onOpen(film)} sx={{ flexGrow: 1 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'common.white', px: 2, py: 1.5 }}>
          <Typography variant="h6" component="h3" sx={{ pr: 5 }}>
            {film.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {film.original_title_romanised}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Direção de {film.director}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Chip size="small" label={film.release_date} />
            <Chip size="small" label={`${film.running_time} min`} />
            <Chip size="small" color="secondary" label={`Nota ${film.rt_score}`} />
          </Stack>
        </CardContent>
      </CardActionArea>

      <IconButton
        aria-label={isFavorite ? `Remover ${film.title} dos favoritos` : `Favoritar ${film.title}`}
        onClick={() => onToggleFavorite(film.id)}
        sx={{ position: 'absolute', top: 8, right: 8, color: 'common.white', fontSize: 22 }}
      >
        {isFavorite ? '★' : '☆'}
      </IconButton>
    </Card>
  );
}