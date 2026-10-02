// Camada de acesso à Ghibli API (AJAX com fetch).
// Toda chamada HTTP do projeto passa por aqui.

const BASE_URL = 'https://ghibliapi.vercel.app';

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`);
  }
  return response.json();
}

export function getFilms(signal) {
  return request('/films?limit=250', signal);
}

export function getPeople(signal) {
  return request('/people?limit=250', signal);
}