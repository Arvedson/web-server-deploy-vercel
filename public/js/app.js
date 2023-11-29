console.log("Client side js file is loaded")


const weatherButtom = document.querySelector("form") //metodo js
const search = document.querySelector("input")
const text1 = document.querySelector("#text1")
const text2 = document.querySelector("text2")






weatherButtom.addEventListener("submit", (e) =>{
    e.preventDefault() //solo previene el autorefresh
   

    const location = search.value
    //console.log(location)

    text1.textContent = "Loading..."
    

    fetch("http://localhost:3000/weather?address=" + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error) {
            text1.textContent = data.error
            console.log(data.error)
            

        } else {
            
            
            console.log(data.ubicacion)
            console.log(data.forecast)
            console.log("la temperatura en", data.ubicacion, "es de ", data.forecast.temperatura,"C°, con una humedad de", data.forecast.humedad,"%")
            text1.textContent ="la temperatura en "+ data.ubicacion + " es de " + data.forecast.temperatura+ "C°, con una humedad de " + data.forecast.humedad +"%"
        }
    
    })
})
})