
//Creación de la función que guarda el array de los paises con las propiedades
//la cual se va a exportar. (nombre,capital, población,bandera y lenguaje)

export function fetchCountries(name){
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(
    (response) => {
      if (!response.ok){
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}