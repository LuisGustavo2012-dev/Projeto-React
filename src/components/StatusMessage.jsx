import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';

// Estados de interface: carregando, erro e lista vazia.
export function Loading({ label = 'Carregando...' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 6, justifyContent: 'center' }}>
      <CircularProgress size={28} />
      <Typography>{label}</Typography>
    </Box>
  );
}

export function ErrorMessage({ error, onRetry }) {
  return (
    <Alert
      severity="error"
      action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Tentar de novo</Button>}
      sx={{ my: 3 }}
    >
      Não foi possível carregar os dados. {error?.message}
    </Alert>
  );
}

export function EmptyMessage({ title, hint }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h6">{title}</Typography>
      {hint && <Typography color="text.secondary">{hint}</Typography>}
    </Box>
  );
}