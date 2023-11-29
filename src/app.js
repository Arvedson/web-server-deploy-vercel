
const hbs = require("hbs")
const path = require("path")
const express = require("express") 
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//https://expressjs.com/

// console.log(__dirname)
// console.log(path.join(__dirname, "../public"))

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewspath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// setup static directory to serve 
app.use(express.static(publicDirectoryPath)) //middleware express.static: se encarga de trabajar con archivos "estaticos" css, js, html, ts, jsx, hbo etc.


// un middleware es una funcion que tiene acceso a al objeto de solicitud de "req" y respuesta "res", tambien tienen acceso a la
// siguiente funcion middleware, tambien controlan las secuencias en las que se van a ejecutar, los condicionamientos y funcionalidades 
// con los cuales seran procesados los datos dependiendo de la finalidad


//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewspath)
hbs.registerPartials(partialsPath)

// un template/plantilla es una herramienta que nos permite organizar y reutilizar archivos rendereables, rellenables con datos, dependiendo del usuario y del servidor
// son herramientas que promueven la organizacion y reutyilizacion de estructuras de documentos. comunmente estos documentos son html, css, js 
// existen los template engines, los cuales se encargan de insertar codigo bajo sus propias sintaxis. algunos ejemplos de estos modulos:
// Handlebars: File Extension: .hbs or .handlebars.  ------  EJS (Embedded JavaScript): File Extension: .ejs.   ------   Pug (formerly Jade): File Extension: .pug
// cada uno de estos motores de plantillas tienen funciones espcificas ya sea desde injectar codigo javascript <% %>, la insercion de datos {{ }} y mucho mas. 


app.get("", (req, res) => { // aqui se esta renderizando un documento html (hbo template engine module), la estructura de este documento se toma como plantilla para poderle insertar codigo en donde sea deseado. 
    res.render("index", {
        title: "Weather app",
        name: "tomas"
    }) // la funcion render lleva como parametros la ruta/nombre del archivo y los valores a introducir
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Tomas"
    })
})

app.get("/help", (req, res) =>{
    res.render("help",{
        title: "help",
        name: "tomas",
        ayuda: "para obtener informacion marque al 369"
    })
})

app.get("/products", (req, res) =>{
    if(!req.query.search){

        return res.send({
            error:"Please provide a search tearm"
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send({
            error: "Please insert an address"
        });

    geocode(req.query.address, (error, coordinates) => {
        if (error) {
            return res.send({ error });
        }

        forecast(coordinates, (error, { temperatura, humedad, ubicacion }) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: { temperatura, humedad },
                ubicacion,
                address: req.query.address
            });
        });
    });
});


app.get("/help/*", (req, res) =>{
    res.render("help2", {
        title: "404",
        msg: "para pedir mas informacion soporte al cliente",
        name: "tomas"
    })
})

app.get("*", (req, res) =>{
    
    res.render("404", {
        title: "404 Page not found",
        msg: "esta pagina no existe",
        name: "tomas"
    })
})



//---------------------------------//

// get es una funcion del modulo express para obtener informacion de un servidor (en este caso framework express)
// si un usuario interactuara con una interfaz grafica introduciendo x valores; estos serian pasados como parametros a las funciones callback (req, res).. 
// una vez que la funcion get tenga sus parametros definidos por el usuario, este podra acceder a x informacion.
// toda esta comunicacion son los bloques "configurados al gusto" que componen un URL

/* app.get("/", (req, res) => {
    res.send("<h1>Hola mundo! con Express</h1>") //send back HTML
})*/

app.get("/Inicio", (req, res) =>{ 
    res.send({ // send back JSON
        nombre: "Tomas",
        edad: 29,
        localidad: "Torreon",
    })
})

/*app.get("/about", (req, res) =>{
    res.send("<h1>Acerca de</h1>")
})*/

/*app.get("/weather", (req, res) =>{

    res.send({
        ubi: "torreon",
        temperatura: 10, 
        windspeed: 15,
    })
})*/

/*app.get("/help", (req, res) => {
    res.send("Ayuda")
})*/

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log("Server is up on port 3000")
})


//en resumen, usamos handlebars para poder renderear contenido dinamico 