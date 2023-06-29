import axios from 'axios';

const axios = require('axios');

axios.defaults.headers.common['x-api-key'] =
  'live_cU8g1YfvYO4Xl2zaEwj6ftSMwAfh4kzsyfbHD65YbVDYIG5CbqVXU0GPY1Qhlcxx';

axios
  .get('https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}')
  .then(function (response) {
    // обработка успешного запроса
    console.log(response);
  })
  .catch(function (error) {
    // обработка ошибки
    console.log(error);
  })
  .finally(function () {
    // выполняется всегда
  });
