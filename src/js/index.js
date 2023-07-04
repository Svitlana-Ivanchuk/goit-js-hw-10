import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
let breedId = null;

selectEl.addEventListener('change', onBreedSelect);

function onBreedSelect(evt) {
  fetchBreeds();
  breedId = evt.target.value;

  // fetchBreeds(breed).then(data => {
  //   catInfo.innerHTML = createMarkup(data);
  // });

  // fetchCatByBreed(breedId).then(data => {
  //   catInfo.innerHTML = createMarkup(data);
  // });

  fetchBreeds().then(data => {
    catInfo.insertAdjacentHTML('beforeend', createDescMarkup(data));
  });

  fetchCatByBreed(breedId).then(data => {
    catInfo.insertAdjacentHTML('afterbegin', createPhotoMarkup(data));
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
      option.text = selectBreed[i].name;
    }
    return selectBreed;
  })
  .catch(error => console.log(error));

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ name, temperament, description, url }) =>
//         `<div><img src="${url}" ail="${name}" /></div>
//         <div>
//         <h2>${name}</h2>
// <h3>${temperament}</h3>
// <p>${description}</p>
// </div>`
//     )
//     .join('');
// }
function createPhotoMarkup(arr) {
  return arr
    .map(
      ({ name, url }) =>
        `<div><img src="${url}" ail="${name}" /></div>
        <div>`
    )
    .join('');
}
function createDescMarkup(data) {
  return data
    .map(
      ({ name, temperament, description }) =>
        `<div>
        <h2>${name}</h2>
        <h3>${temperament}</h3>
        <p>${description}</p>
        </div>`
    )
    .join('');
}
