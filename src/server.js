import express from 'express';
import productsRouter from './routes/productos.router.js';
import viewsRouter from './routes/views.router.js'
import viewProductosRouter from './routes/productos.router.js'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import Contenedor from './contenedor/contenedor.js';



const app = express(); 
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})

const contenedorServer = new Contenedor();

//configuracion de plantilla handlebars

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use('/api/productos', productsRouter);
app.use('/productos', viewProductosRouter)
app.use(express.static(__dirname+'/public'));




















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