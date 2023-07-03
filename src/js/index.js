import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const selectBreed = [];
selectEl.addEventListener('change', onBreedSelect);

function onBreedSelect(evt) {
  const chosenBreed = evt.target.value;
  // const { name, temperament, description } = chosenBreed;
  console.log(chosenBreed);
  if (selectBreed) {
    fetchCatByBreed(selectBreed);
  }
}

fetchBreeds()
  .then(data => {
    let selectBreed = data;
    for (let i = 0; i < selectBreed.length; i += 1) {
      const option = document.createElement('option');
      option.value = selectBreed[i].id;
      option.text = selectBreed[i].id;
      selectEl.options.add(option);
    }
    console.log(selectBreed);
  })
  .catch(error => console.log(error));

// добавляємо options

// function createMarkup(arr) {
//   console.log(data);
//   return arr.map(data => data.id).join('');
// <img src="" ail="" />
// <h2></h2>
// <h3></h3>
// <p></p>
// }
// console.log(createMarkup(id));
// selectEl.innerHTML = createMarkup(data.id);
