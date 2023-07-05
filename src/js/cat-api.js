'use strict';
import Notiflix from 'notiflix';
import axios from 'axios';
import { onFetchError } from './index';

axios.defaults.headers.common['x-api-key'] =
  'live_cU8g1YfvYO4Xl2zaEwj6ftSMwAfh4kzsyfbHD65YbVDYIG5CbqVXU0GPY1Qhlcxx';

const BASE_URL = `https://api.thecatapi.com/v1`;
const API_KEY =
  'live_cU8g1YfvYO4Xl2zaEwj6ftSMwAfh4kzsyfbHD65YbVDYIG5CbqVXU0GPY1Qhlcxx';

function fetchBreeds() {
  // https://api.thecatapi.com/v1/breeds
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(onFetchError);
    }
    return resp.json();
  });
}
// console.log(fetchBreeds());

function fetchCatByBreed(breedId) {
  //https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
