import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FILTER_ACTIONS } from '../reducers/filtersReducer.js';

export default function FilterBar({ filters, directors, dispatch }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        label="Buscar por título"
        value={filters.search}
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET_SEARCH, value: e.target.value })}
        sx={{ flex: 2 }}
      />

      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="director-label">Diretor</InputLabel>
        <Select
          labelId="director-label"
          label="Diretor"
          value={filters.director}
          onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET_DIRECTOR, value: e.target.value })}
        >
          <MenuItem value="all">Todos</MenuItem>
          {directors.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="sort-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-label"
          label="Ordenar por"
          value={filters.sortBy}
          onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET_SORT, value: e.target.value })}
        >
          <MenuItem value="title">Título (A-Z)</MenuItem>
          <MenuItem value="year">Ano (mais recente)</MenuItem>
          <MenuItem value="score">Nota (maior)</MenuItem>
          <MenuItem value="duration">Duração (maior)</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={() => dispatch({ type: FILTER_ACTIONS.RESET })}>Limpar</Button>
    </Stack>
  );
}