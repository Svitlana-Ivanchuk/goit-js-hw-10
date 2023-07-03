import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
let selectBreed = [];
let breed = {};

selectEl.addEventListener('change', onBreedSelect);

function onBreedSelect(evt) {
  fetchBreeds(breed);
  breedId = evt.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId).then(data => {
    catInfo.innerHTML = createMarkup(data);
  });
}

fetchBreeds()
  .then(data => {
    selectBreed = data;
    for (let i = 0; i < selectBreed.length; i += 1) {
      breed = selectBreed[i];
      let option = document.createElement('option');
      selectEl.options.add(option);
      option.value = selectBreed[i].id;
      option.innerHTML = `${breed.name}`;
    }
    return selectBreed;
  })
  .catch(error => console.log(error));

function createMarkup(arr) {
  return arr
    .map(
      ({ name, temperament, description, url }) =>
        `<img src="${url}" ail="${name}" />
<h2>${name}</h2>
<h3>${temperament}</h3>
<p>${description}</p>`
    )
    .join('');
}
