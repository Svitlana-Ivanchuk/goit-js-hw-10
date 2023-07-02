'use strict';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_cU8g1YfvYO4Xl2zaEwj6ftSMwAfh4kzsyfbHD65YbVDYIG5CbqVXU0GPY1Qhlcxx';

function fetchBreeds(breed) {
  return fetch(`${BASE_URL}/breeds?key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

console.log(fetchBreeds('Abyssinian'));
export default fetchBreeds;

// import axios from 'axios';

// const axios = require('axios');

// axios.defaults.headers.common['x-api-key'] =
//   'live_cU8g1YfvYO4Xl2zaEwj6ftSMwAfh4kzsyfbHD65YbVDYIG5CbqVXU0GPY1Qhlcxx';

// axios
//   .get('https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}')
//   .then(function (response) {
//     // обработка успешного запроса
//     console.log(response);
//   })
//   .catch(function (error) {
//     // обработка ошибки
//     console.log(error);
//   });
