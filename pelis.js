const fs = require("fs");
const DATOSJSON = fs.readFileSync(__dirname + "/pelis.json");
const OBJETOSENSTRING = DATOSJSON.toString();
const PARSEODEJSON = JSON.parse(OBJETOSENSTRING);
const TEXTONOFORMAT = JSON.stringify(PARSEODEJSON);

const getAll = function (collection) {
  return PARSEODEJSON;
};

const searchBy = function (texto, arrayDePelis) {
  let arrayFiltrado = arrayDePelis.filter((arrayDePelis) => {
    if (arrayDePelis.title.includes(texto)) {
      return arrayDePelis;
    }
  });
  return arrayFiltrado;
};

const sortBy = function (propiedad, arrayDePelis) {
  let pelisOrdenadas = arrayDePelis.sort((a, b) => {
    if (a[propiedad] > b[propiedad]) {
      return 1;
    }
    if (a[propiedad] < b[propiedad]) {
      return -1;
    }
    return 0;
  });
  return pelisOrdenadas;
};

const filtrarBy = function (texto, arrayDePelis) {
  let arrayFiltrado = arrayDePelis.filter((arrayDePelis) => {
    if (arrayDePelis.tags.includes(texto)) {
      return arrayDePelis;
    }
  });
  return arrayFiltrado;
};

exports.searchByCriteria = function (criterios) {
  let resultadoFinal = [];
  let peliculas = getAll();

  if (criterios.search) {
    peliculas = searchBy(criterios.search, peliculas);
    resultadoFinal = searchBy(criterios.search, peliculas);
  }
  if (criterios.sort) {
    peliculas = sortBy(criterios.sort, peliculas);
    resultadoFinal = sortBy(criterios.sort, peliculas);
  }
  if (criterios.tags) {
    peliculas = filtrarBy(criterios.tags, peliculas);
    resultadoFinal = filtrarBy(criterios.tags, peliculas);
  }

  if (Object.keys(criterios).includes("no-format")) {
    if (resultadoFinal == false) {
      return TEXTONOFORMAT;
    } else {
      return JSON.stringify(resultadoFinal);
    }
  }

  return peliculas;
};
