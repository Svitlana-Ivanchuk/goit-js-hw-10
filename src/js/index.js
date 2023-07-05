import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let breeds = [];

selectEl.style.display = 'block';
loaderEl.style.display = 'block';
errorEl.style.display = 'none';

selectEl.addEventListener('change', onBreedSelect);
fetchBreeds().then(createOptionsToSelect).catch(onFetchError);

function onBreedSelect(evt) {
  loaderEl.style.display = 'none';
  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId).then(renderCatInfoCard).catch(onFetchError);

  evt.reset();
}

function createOptionsToSelect(data) {
  breeds = data;
  for (let i = 0; i < breeds.length; i += 1) {
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
  selectEl.style.display = 'none';
  loaderEl.style.display = 'none';

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
