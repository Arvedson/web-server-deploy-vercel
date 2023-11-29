const axios = require('axios');

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = "https://api.opencagedata.com/geocode/v1/json?key=3408d91c500640649a423dfaa23babe2&q=" + encodedAddress;
  
    axios.get(url)
      .then(response => {
        // verificamos los datos en caso de que haya una respuesta
        if (response.data && response.data.results && response.data.results.length > 0) {
          // obtener las coordenadas (latitud, longitud y ubicacion) del lugar encontrado
          const lat = response.data.results[0].geometry.lat;
          const lng = response.data.results[0].geometry.lng;
          const ubicacion = response.data.results[0].formatted;
          // se llama un callback en forma de objeto porque esa es la forma en que se estan recibiendo los datos 
          callback(null, { lat, lng, ubicacion });
        } else {
          // si la respuesta no encuentra los datos validos
          callback("Address not found, please try another", null);
        }
      })
      .catch(error => {
        // en caso de desconeccion y no haya respuesta alguna axios dara su propio statement error.message
        callback("Please insert a valid address or check your internet connection", null);
        console.log(error.message)
      });
}

module.exports = geocode






