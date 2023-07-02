import fetchBreeds from './cat-api';

const selectEl = document.querySelector('.breed-select');

fetchBreeds()
  .then(data => (selectEl.innerHTML = createMarkup(data.id)))
  .catch(error => console.log(error));

function createMarkup(arr) {
  return arr.map(arr => arr.id).join('');
}
