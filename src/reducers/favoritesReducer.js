// Reducer dos favoritos (useReducer).
// Guardamos só os ids dos filmes; os dados completos vêm da lista da API.

export const initialFavorites = [];

export const FAVORITE_ACTIONS = {
  TOGGLE: 'favorites/toggle',
  REMOVE: 'favorites/remove',
  CLEAR: 'favorites/clear',
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITE_ACTIONS.TOGGLE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
    case FAVORITE_ACTIONS.REMOVE:
      return state.filter((id) => id !== action.id);
    case FAVORITE_ACTIONS.CLEAR:
      return [];
    default:
      return state;
  }
}