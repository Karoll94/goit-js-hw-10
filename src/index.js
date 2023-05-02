//Importación de los estilos
import './css/styles.css';
//Importación de la función que almacena el array de paises de la API
import { fetchCountries } from './fetchCountries';

//Aplicación del Debounce como manejador de eventos
let debounce = require('lodash.debounce');

//Importación de la biblioteca notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Demora del debounce
const DEBOUNCE_DELAY = 300;

//Acceso al DOM
const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//función de la busqueda de los paises
const searchCountry = debounce(event => {
  let country = event.target.value.trim();
  if(country === ''){
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }

  if (country !== '') {
    console.log(fetchCountries(country));
    fetchCountries(country)
      .then(country => {
        renderListOrCard(country);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
      });
  }
}, DEBOUNCE_DELAY);


//Función para definir el marcado de la lista o tarjeta de acuerdo a la longitud
//de la cadean de busqueda del pais
const renderListOrCard = country => {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (country.length >= 2 && country.length <= 10) {
    renderListCountry(country);
    console.log(country);
  }
  if (country.length < 2) {
    renderCardCountry(country);
  }
};


//Funcion para realizar el marcado de la lista de paises

const renderListCountry = country => {
  const markup = country
    .map(({ name, flags }) => {
      return `<li class="country__item">
     <img class="country__img" src="${flags.svg}" alt="Flag of ${name.official}">
     <h3 class="country__name">${name.official}</h3>
     </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);
};

//Funcion para realizar el marcado de la tarjeta del pais

const renderCardCountry = country => {
  const markup = country
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <div class="country__name-container">
      <img class="country__img" src="${flags.svg}" alt="Flag of ${
        name.official
      }">
     <h3 class="country__name-card">${name.official}</h3>
      </div>
     <p class="country__capital"><span class="country__title">Capital:</span> ${capital}</p>
     <p class="country__population"><span class="country__title">Population:</span> ${population}</p>
     <p class="country__languages"><span class="country__title">Languages:</span> ${Object.values(languages)}</p>
     `;
    })
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', markup);
};

//Llamado del evento input para la búsqueda del pais
inputSearch.addEventListener('input', searchCountry);
