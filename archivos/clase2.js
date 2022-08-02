const fs = require('fs')



class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = "../archivos/"+nombreArchivo+".json"

    }

    async getData(){
        try{
            return await fs.promises.readFile(this.nombreArchivo, "utf-8");
        } catch (error){
            if(error.code == "ENOENT"){
                fs.writeFile(this.nombreArchivo,"[]", (error)=>{
                if(error){
                    console.log("el archivo no pudo ser creado")
                }
            })
           
        }
        
    }

}




async getAll(){
    try{
    const datos = await this.getData()
    return JSON.parse(datos)
} catch (error){
    console.log(error)
}

}


async save(objeto){
    try{
        
        let contenidoDeArchivo = await this.getData()
        let contenidoEnJson = JSON.parse(contenidoDeArchivo);
        let arreglo = []
        //esto lo hago para obtener el ultimo numero de id ordenado
        const indice = contenidoEnJson.map(x=>x.id).sort()
        // para que sume a partir de el ultimo id 1+
        objeto.id = (indice[indice.length-1])+1
        
        // asigna un id para que no sea null. 
        if (!objeto.id){
            objeto.id=1
            arreglo = [{...objeto}]
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arreglo))
            return arreglo[0].id
        }
        
        contenidoEnJson.push(objeto)
        
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoEnJson))
    
    }catch(error){
        console.log("No se pudo grabar el archivo")
    }

}
// encuentra por id 
async getById(number) {
    try{
    let data = await this.getData()
    let dataEnJson = JSON.parse(data);
    dataEnJson.forEach(objeto => {
        if(objeto.id === number){
        console.log(objeto)
    }   else{
            console.log(null)
        }
    })
    } catch(error){
    console.log("NARANJA FANTA")
}


}





async deleteAll(){
    try{
        await fs.promises.unlink(this.nombreArchivo)
        console.log("fue borrado")
    } catch(error){
        console.log("algo paso salio mal con el borrado")
    }
    }

 

    async deleteById(number){
        
        try{
            let data = await this.getData()
            let dataEnJson = JSON.parse(data);
            let newDataEnJson = dataEnJson.filter((item) => item.id !==number );
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newDataEnJson))
            console.log("chau id")
            
            
        } catch(error){
            console.log("algo salio mal")
        }
        }
}




const objetoInicial = {
        title: "NUEVO",                                                                                                                          
      price: 500,                                                                                                                                     
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                      
}

//crea archivo json 
const objeto1 = new Contenedor ("productos")
objeto1.getData()
//agrega los objetos dentro del archivos productos
objeto1.save(objetoInicial)


objeto1.getAll().then(x=>console.log(x))

 

//el de borrar con id lee y vuelve a grabar todo pero sin ese id
objeto1.deleteById(4)

objeto1.getById(2)

//borra el archivo completo
//objeto1.deleteAll()







