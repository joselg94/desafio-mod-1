const pelis = require("./pelis");

function parsearARGV(argv) {
  //... acá ocurre la magia
  const respuesta = {};

  argv.forEach(function (item, ind) {
    if (item.startsWith("--")) {
      let argumentosSinGuiones = item.slice(2);
      respuesta[argumentosSinGuiones] = argv[ind + 1];
    }
  });

  return respuesta;
}

function main() {
  const comandosAEjecutar = parsearARGV(process.argv.slice(2));
  const peliculasMostradas = pelis.searchByCriteria(comandosAEjecutar);

  console.table(peliculasMostradas);
}

main();
