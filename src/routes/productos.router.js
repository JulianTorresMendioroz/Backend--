import {Router} from 'express';
import Contenedor from '../contenedor/contenedor.js';

const router = Router();
const FileDataNueva = new Contenedor();

router.get('/',(req,res)=>{

  res.send('Ruta base productos') 
  
  })

// Obtengo todos los productos

router.get('/allProducts', async (req,res)=>{

    try{
      let getAllProducts = await FileDataNueva.getAll();
      res.send(getAllProducts)
    }catch(error){
      console.log(`Error: ${error}`)
    }

  })
  
// Obtengo producto segun su id 

  router.get('/:id', async (req,res)=>{

    // router.get('/:id([0-9])*', (req, res) => { // let id = req.params.id; // let producto = productos.listar(id); // if (producto == null) { // res.send({ error: "router.get('/:id([0-9])*', (req, res) => Producto no encontrado" }) // } else { // res.json(producto) // } // }) 
  
    try{
      let getAllProducts = await FileDataNueva.getAll();
      let id = Math.floor(Math.random()*getAllProducts.length)
      let getId = await FileDataNueva.getById(id)
      res.send(getId) 
    }catch(error){
      console.log(`Error${error}`)
    }
     
  })

  // Recibe productos y agrega con id 

  router.post('/addProduct', async (req,res)=> { 

      let addProducts = await FileDataNueva.getAll();
    addProducts.push({
      "title": "Buzo Naranja",
      "price": "3400",
      "id": 4
      },)

      res.send(addProducts)
  })

  // Actualizar producto segun id 
 
  router.put('/:id', async (req, res)=>{
    let id = req.params.id;
    console.log('req.body : ',req.body);
    let producto = await FileDataNueva.getById(id);
    if (producto == null) {
        return res.json([{ "error" : "Producto no encontrado" }]);
    }
    else {
        FileDataNueva.updateId(req.params.id, req.body.title, req.body.price);
        return res.json([{ "estado": "ACTUALIZADO" }]);
    }
    
  })

  // Elimina segun id 

  router.delete('/:id', (req,res)=>{

    let id = req.params.id;
    
    FileDataNueva.deleteById(id);
 
   return res.json({Estado: "El id se eliminó" + " " + id})

  })

export default router;