import { useEffect, useReducer } from 'react';
import {
  favoritesReducer,
  initialFavorites,
  FAVORITE_ACTIONS,
} from '../reducers/favoritesReducer.js';

const STORAGE_KEY = 'projeto-react:favorites';

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : initialFavorites;
  } catch {
    return initialFavorites;
  }
}

export default function useFavorites() {
  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavorites, loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return {
    favorites,
    isFavorite: (id) => favorites.includes(id),
    toggleFavorite: (id) => dispatch({ type: FAVORITE_ACTIONS.TOGGLE, id }),
    removeFavorite: (id) => dispatch({ type: FAVORITE_ACTIONS.REMOVE, id }),
    clearFavorites: () => dispatch({ type: FAVORITE_ACTIONS.CLEAR }),
  };
}