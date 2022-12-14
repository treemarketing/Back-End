// const express = require('express')

// const app = express()


// const PORT = 8080

// const server = app.listen(PORT, () => {
//    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
// })

// server.on("error", error => console.log(`Error en servidor ${error}`))

// app.get('/prueba', (req, res) => {
//     res.send({ mensaje: {title: "Escuadra",
//     "price": 123.45,
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     "id": 1 }})
//  })
 



// const fs = require('fs')
// class Contenedor {

//     constructor(nombreArchivo){
//         this.nombreArchivo = "../archivos/"+nombreArchivo+".json"
//     }

//      obtenerDatos(){
//         const archivos = fs.readFileSync(this.nombreArchivo, "utf-8")
//         const archivoEnJson = JSON.parse(archivos)
//         app.get('/productos', (req, res) => {
//             res.send({ mensaje: archivoEnJson})
//          })
//     }
    
   

//     obtenerDatosRandom(random){
//        const archivos = fs.readFileSync(this.nombreArchivo, "utf-8")
//        const archivoEnJson = JSON.parse(archivos)
       
//        archivoEnJson.forEach(elemento => {
//         if(elemento.id = random){
//         app.get('/productosRandom', (req, res) => {
//                 res.send({ mensaje: elemento})
//              })
//     }else { console.log("algo paso")}
//     })
       
//    }

// }

// const objeto2 = new Contenedor ("productos")
// objeto2.obtenerDatos()
// const random = Math.ceil(Math.random()*3);

// objeto2.obtenerDatosRandom(random)
 



//clase 7 - 8

const express = require('express')

const app = express()
const { Router } = express
const router = Router()


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//defino lugar donde se van a poder ver los archivos 
app.use('/public', express.static(__dirname + '/public'));
//un middleware de prueba

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use('/api/productos', router)



let productos = [ {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "http://localhost:8080/public/tato.jpg",
    id: 1
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "http://localhost:8080/public/tato.jpg",
    id: 2
  },
  {
    title: "Globo Terr??queo",
    price: 345.67,
    thumbnail: "http://localhost:8080/public/tato.jpg",
    id: 3
  }
 ]

//clase

class Products {
  constructor(products){
  this.products = [...products];
  }

  getAll(){
    return this.products;
  }

  findOne(id){
  return this.products.find((item)=>item.id == id)
  }

  addOne(product){
    const lastItem = this.products[this.products.length - 1]
    let lastId = 1;
    if (lastItem){
      lastId = lastItem.id + 1;
    }
    product.id = lastId
    this.products.push(product)
    return this.products[this.products.length - 1];
  }
  updateOne(id, product){
    const productInsert = {...product, id}

    for (let i=0; i< this.products.length; i++){
      if(this.products[i].id == id){
        this.products[i] = productInsert;
        return productInsert;
      }
    }
    return undefined;
  }

  deleteOne(id){
    const encontrarProducto = this.findOne(id);
    if(encontrarProducto){
      this.products = this.products.filter((item)=> item.id != id)
      return id;
    }
    return undefined;
  }
}




//MOSTRAR FORMULARIO

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//agrega el producto cargado en el formulario
router.post('/', (req, res) => {
  const {body} = req;
  console.log(body)
  body.price = parseFloat(body.price);
  const products = new Products(productos)
  const productoGenerado = products.addOne(body);
  res.json({sucess: "ok", new: productoGenerado})
})

//muestra todos los productos
router.get("/", (req, res) => {
    const products = new Products (productos)
    res.json(products.getAll())
})

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
router.get('/:id', (req, res) => {
    let { id } = req.params;
    const products = new Products(productos)
    id = parseInt(id)

    const encontrar = products.findOne(id)
    if (encontrar){
        res.json(encontrar)
    }else{
    res.json({error: "producto no encontrado"})
    }
  });

  //PUT actualizar producto
  router.put('/:id', (req, res) => {
    let { id } = req.params;
    const { body } = req;
    id = parseInt(id);

    const products = new Products(productos)

    const productToChange = products.updateOne(id,body)
    if (productToChange){
      res.json({sucess: "ok", new: productToChange})
    }else{
      res.json({error: "producto no encontrado"})
    }

    res.json({ sucess: "ok", new: productToChange})
  });

  //DELETE CON ID 
  router.delete('/:id', (req, res) => {
    //debe ser let para introducir el cambio
    let { id } = req.params;  
    const products = new Products(productos)
    id = parseInt(id);


    const deleteProduct = products.deleteOne(id);

    if (deleteProduct != undefined){
      res.json({sucess: "ok", id })
    }else{
    res.json({error: "producto no encontrado"})  
    }
  });


app.post("/", (req, res) => {
    const respuesta={
        sucess: "ok",
        newProduct:{
            id: 1000,
            name: "adiddas",
            price: 123,
        }
    }
    res.json(respuesta)
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get('/:id', (req, res) => {
    let { id } = req.params;
    const encontrar = productos.find((item)=>item.id == id)
    if (encontrar){
        res.json(encontrar)
    }else{
    res.json({})
    }
  });




//POST CON BODY (SIN ID!!)
app.post('/', (req, res) => {
    const { body } = req;

    console.log(body)
    res.json("hola mundo")
  });


//PUT CON ID PARAMS SIEMPRE y BODY!
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
   

    const productToChange = productos.find((item)=>item.id ==id)
    productToChange.price = body.price
    res.json({ sucess: "ok", new: productToChange})
  });


  //DELETE CON ID PARAMS SIEMPRE
app.delete('/:id', (req, res) => {
    const { id } = req.params;  
    const productsFilteredById = productos.filter((item)=> item.id != id)
    res.json("hola mundo")
  });




