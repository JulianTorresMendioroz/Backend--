import express from 'express';
import Contenedor from './contenedor/contenedor.js';

const server = express(); 
const PORT = 8080;

const FileDataNueva = new Contenedor();

//Server en escucha

const serverListening = server.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})


server.get('/',(req,res)=>{

res.send('Servidor en ejecución') 

})

server.get('/productos', async (req,res)=>{

  let getAllProducts = await FileDataNueva.getAll();
    res.send(getAllProducts)

})

server.get('/randomProduct', async (req,res)=>{

    let getAllProducts = await FileDataNueva.getAll();
    let id = Math.floor(Math.random()*getAllProducts.length)
    let getId = await FileDataNueva.getById(id)
    res.send(getId) 
   


})
















/*import fileDataProd from "./contenedor/contenedor"

const prodsData = new fileDataProd();

const ambienteDeEjecucion = async () => {

    //getAll
   /*let productos = await prodsData.getAll();
    console.log(productos)

    let prods = {
        title: 'Buzo Rojo',
        price: '4000',
       
    }
    */

    //Save 
   //await prodsData.save(prods);
   
   //getById
   //let productosId = await prodsData.getById(2);
   //console.log(productosId)

   //deleteById
   /*let prodsDeleteId = await prodsData.deleteById(6);
   console.log(prodsDeleteId)*/

    //deleteAll
   /*let deleteAllData = await prodsData.deleteAll()
   console.log(deleteAllData)
}

ambienteDeEjecucion(); */