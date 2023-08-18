import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Vod8AH8CsXErnU26oCNZwbOyN1mg5fjgKbqely69Kg5YsuMkkBv77t5oIlNKkgi8';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return axios.get('breeds/').then(responce => responce.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(responce => responce.data);
}

export { fetchBreeds, fetchCatByBreed };
