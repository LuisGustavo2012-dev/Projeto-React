import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';

export default function FilmCard({ film, onOpen }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => onOpen(film)} sx={{ height: '100%' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'common.white', px: 2, py: 1.5 }}>
          <Typography variant="h6" component="h3">
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
    </Card>
  );
}