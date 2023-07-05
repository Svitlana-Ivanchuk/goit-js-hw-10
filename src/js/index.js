import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
// let breedId = null;
let breeds = [];

// loaderEl.classList.replace('loader', 'is-hidden');

selectEl.addEventListener('change', onBreedSelect);

function onBreedSelect(evt) {
  const breedId = evt.currentTarget.value;

  console.log(breedId);
  fetchBreeds();
  fetchCatByBreed(breedId).then(renderCatInfoCard).catch(onFetchError);
}

fetchBreeds().then(createOptionsToSelect).catch(onFetchError);

function createOptionsToSelect(data) {
  breeds = data;
  for (let i = 0; i < breeds.length; i += 1) {
    breed = breeds[i];
    let option = document.createElement('option');
    selectEl.options.add(option);
    option.value = breeds[i].id;
    option.text = breeds[i].name;
  }
  return breeds;
}

function renderCatInfoCard(breedId) {
  const markcup = createMarkup(breedId);
  catInfo.innerHTML = markcup;
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds: [{ name, temperament, description }], url }) =>
        `<div><img src="${url}" alt="${name}" /></div>
        <div>
        <h2>${name}</h2>
<h3>${temperament}</h3>
<p>${description}</p>
</div>`
    )
    .join('');
}

export function onFetchError(error) {
  // selectEl.classList.remove('is-hidden');
  // loaderEl.classList.replace('loader', 'is-hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
