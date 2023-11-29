const geocode = require("./geocode");
const request = require("request")


const forecast = (coordinates, callback) =>{
 
    const encodedCoordinates = encodeURIComponent(`${coordinates.lat},${coordinates.lng}`);
    
    const url = `http://api.weatherapi.com/v1/current.json?key=c8dd6fbba51b497dbc220422231211&q=${encodedCoordinates}&aqi=no`;
    request({
        url: url
      }, (error, response) => {
        if (error) {
          console.log("No es posible conectar con el servidor")
        } else if (response.error) {
          console.log("Input invalido")
        } else {
          const data = JSON.parse(response.body)
          //console.log(data)
          //const ubicacion = data.location.name
          const ubicacion = coordinates.ubicacion                
          const temperatura = data.current.temp_c
          const humedad = data.current.humidity
          callback(null, { temperatura, humedad, ubicacion });
          //console.log("temperatura", temperatura, "C°")
          //console.log("humedad", humedad, "%")
        }
      }
    
    )
    
}
module.exports = forecast