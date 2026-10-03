import { useMemo } from 'react';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import { getPeople } from '../services/ghibliApi.js';
import { ErrorMessage, Loading } from './StatusMessage.jsx';

// Modal de detalhes. Busca os personagens via AJAX ao abrir.
// Os links `people` do filme podem vir genéricos, então filtramos
// a lista completa de personagens pelo id do filme.
export default function FilmDetailDialog({ film, onClose, isFavorite, onToggleFavorite }) {
  const { data: people, loading, error } = useFetch(getPeople, [film.id]);

  const cast = useMemo(
    () => (people ?? []).filter((p) => p.films.some((url) => url.includes(film.id))),
    [people, film.id]
  );

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="film-title">
      <DialogTitle id="film-title">
        {film.title}
        <Typography variant="body2" color="text.secondary">
          {film.original_title} · {film.release_date}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography sx={{ mb: 2 }}>{film.description}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Direção: {film.director} · Produção: {film.producer} · {film.running_time} min · Nota {film.rt_score}
        </Typography>

        <Typography variant="h6" sx={{ mb: 1 }}>Personagens</Typography>
        {loading && <Loading label="Carregando personagens..." />}
        {error && <ErrorMessage error={error} />}
        {!loading && !error && cast.length === 0 && (
          <Typography color="text.secondary">Nenhum personagem cadastrado para este filme.</Typography>
        )}
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {cast.map((p) => (
            <Chip key={p.id} label={p.name} />
          ))}
        </Stack>
      </DialogContent>

        <DialogActions>
        <Button onClick={() => onToggleFavorite(film.id)}>
          {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}