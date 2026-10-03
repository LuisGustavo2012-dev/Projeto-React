# Projeto-React

SPA em React.js que consome a [Studio Ghibli API](https://ghibliapi.vercel.app/) via AJAX (`fetch`).
Projeto 1 de Programação Web Fullstack.

- Luis Gustavo Roque Desiderio da silva 
- RA: A2706474

## Funcionalidades
- Catálogo de filmes com busca por título, filtro por diretor e ordenação
- Detalhe do filme em modal, com personagens carregados da API
- Favoritos persistidos no `localStorage`

## Requisitos atendidos
- **API JSON aberta:** Studio Ghibli API
- **Hook React:** `useReducer` (filtros e favoritos), além de `useMemo`
- **Biblioteca externa:** Material UI

## Como rodar
```bash
npm install
npm run dev
```

## Estrutura
src/
services/ chamadas HTTP (ghibliApi.js)
reducers/ favoritesReducer, filtersReducer
hooks/ useFetch, useFavorites
components/ FilterBar, FilmCard, FilmGrid, FilmDetailDialog, StatusMessage
theme/ tema do Material UI
App.jsx composição das telas


## Uso de IA
Veja [AI_USAGE.md](./AI_USAGE.md).