import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader-wrapper');
const errorEl = document.querySelector('.error');

let breeds = [];

selectEl.style.display = 'none';
loaderEl.style.display = 'flex';
errorEl.style.display = 'none';

selectEl.addEventListener('change', onBreedSelect);
fetchBreeds(breeds)
  .then(data => {
    createOptionsToSelect(data);
    selectEl.style.display = 'block';
  })
  .catch(onFetchError)
  .finally(hiddenLoader);

function onBreedSelect(evt) {
  const breedId = evt.currentTarget.value;
  loaderEl.style.display = 'flex';
  catInfo.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(renderCatInfoCard)
    .catch(onFetchError)
    .finally(hiddenLoader);
}

function createOptionsToSelect(data) {
  breeds = data;
  for (let i = 0; i < breeds.length; i += 1) {
    let option = document.createElement('option');
    option.value = breeds[i].id;
    option.text = breeds[i].name;
    selectEl.options.add(option);
  }

  return breeds;
}

function renderCatInfoCard(breedId) {
  catInfo.innerHTML = createMarkup(breedId);
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds: [{ name, temperament, description }], url }) =>
        `<div><img src="${url}" alt="${name}" /></div>
        <div class="cat-desc">
        <h2>Breed: ${name}</h2>
<h3>Temperament: ${temperament}</h3>
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

function hiddenLoader() {
  loaderEl.style.display = 'none';
}
// не знаю куда вставить, от него все ломается и виснет
// new SlimSelect({
//   select: document.querySelector('.breed-select'),
// });
