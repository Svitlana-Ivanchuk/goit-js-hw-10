import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// let breedId = null;
let breeds = [];

selectEl.addEventListener('change', onBreedSelect);

function onBreedSelect(evt) {
  const breedId = evt.currentTarget.value;

  console.log(breedId);
  fetchBreeds();
  fetchCatByBreed(breedId)
    .then(renderCatInfoCard)
    .catch(error => console.log(error));
}

fetchBreeds()
  .then(createOptionsToSelect)
  .catch(error => console.log(error));

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
