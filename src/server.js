import express from 'express';
import Contenedor from './contenedor/contenedor.js';
import productsRouter from './routes/productos.router.js';

const app = express(); 
const PORT = 8080;

const FileDataNueva = new Contenedor();

const serverListening = app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})

app.get('/',(req,res)=>{

res.send('Servidor en ejecución') 

})

app.use(express.json());
app.use('/api/productos', productsRouter);
app.use(express.static('public'));


















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