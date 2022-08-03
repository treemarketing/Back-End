const express = require('express')

const app = express()


const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/prueba', (req, res) => {
    res.send({ mensaje: {title: "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1 }})
 })
 



const fs = require('fs')
class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = "../archivos/"+nombreArchivo+".json"
    }

     obtenerDatos(){
        const archivos = fs.readFileSync(this.nombreArchivo, "utf-8")
        const archivoEnJson = JSON.parse(archivos)
        app.get('/productos', (req, res) => {
            res.send({ mensaje: archivoEnJson})
         })
    }
    
   

    obtenerDatosRandom(random){
       const archivos = fs.readFileSync(this.nombreArchivo, "utf-8")
       const archivoEnJson = JSON.parse(archivos)
       
       archivoEnJson.forEach(elemento => {
        if(elemento.id = random){
        app.get('/productosRandom', (req, res) => {
                res.send({ mensaje: elemento})
             })
    }else { console.log("algo paso")}
    })
       
   }

}

const objeto2 = new Contenedor ("productos")
objeto2.obtenerDatos()
const random = Math.ceil(Math.random()*3);

objeto2.obtenerDatosRandom(random)
 

















