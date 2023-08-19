import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './sass/_example.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // If you already have a currenlty running SlimSelect but lost the reference to it.
// // You can access from the original select element.
// let el = document.querySelector('#selectElement')
// el.slim.open() // Or any other options/methods

const refs = {
  select: document.querySelector('.breed-select'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
  wrapper: document.querySelector('.wrapper'),
};

// new SlimSelect({
//   select: '.breed-select',
// });

refs.select.addEventListener('change', addCard);

function onLoad() {
  refs.wrapper.classList.remove('is-hidden');
  fetchBreeds()
    .then(data => {
      const selectList = createMarkup(data);
      addBreedsNames(selectList, refs.select);
    })
    .catch(onError)
    .finally(() => {
      refs.wrapper.classList.add('is-hidden');
      refs.select.classList.remove('is-hidden');
    });
}
onLoad();
function createMarkup(data) {
  return data
    .map(el => {
      return ` <option value=${el.id}>${el.name}</option>`;
    })
    .join('');
}

function addBreedsNames(markup, el) {
  el.innerHTML = markup;
}

function createMarkupCard(url, name, description, temperament) {
  return `<div class="card">
        <div class="box-img"><img src="${url}" alt="${name} image" /></div>
    <div class="content">
      <h2 class="head">${name}</h2>
      <p class="descrition">${description}</p>
      <p class="temper"><b>Temperament</b><br>${temperament}</p>
    </div>`;
}

function addCard(event) {
  const value = event.target.value;
  refs.wrapper.classList.remove('is-hidden');
  fetchCatByBreed(value)
    .then(([breed]) => {
      const { url, breeds } = breed;
      const info = createMarkupCard(
        url,
        breeds[0].name,
        breeds[0].description,
        breeds[0].temperament
      );
      addBreedsNames(info, refs.div);
    })
    .catch(onError)
    .finally(() => {
      refs.wrapper.classList.add('is-hidden');
    });
}

function onError() {
  // refs.error.classList.remove('is-hidden');
  // setTimeout(() => {
  //   refs.error.classList.add('is-hidden');
  // }, 3000);
  Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
}
