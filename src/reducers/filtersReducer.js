// Reducer dos filtros do catálogo (useReducer).

export const initialFilters = {
  search: '',
  director: 'all',
  sortBy: 'title', // title | year | score | duration
};

export const FILTER_ACTIONS = {
  SET_SEARCH: 'filters/setSearch',
  SET_DIRECTOR: 'filters/setDirector',
  SET_SORT: 'filters/setSort',
  RESET: 'filters/reset',
};

export function filtersReducer(state, action) {
  switch (action.type) {
    case FILTER_ACTIONS.SET_SEARCH:
      return { ...state, search: action.value };
    case FILTER_ACTIONS.SET_DIRECTOR:
      return { ...state, director: action.value };
    case FILTER_ACTIONS.SET_SORT:
      return { ...state, sortBy: action.value };
    case FILTER_ACTIONS.RESET:
      return initialFilters;
    default:
      return state;
  }
}