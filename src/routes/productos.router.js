import {Router} from 'express';
import Contenedor from '../contenedor/contenedor.js';

const router = Router();
const FileDataNueva = new Contenedor();


router.get('/',(req,res)=>{

  res.send('Ruta base productos') 
  
  })

// Obtengo todos los productos

router.get('/allProducts', async (req,res)=>{

    let getAllProducts = await FileDataNueva.getAll();
      res.send(getAllProducts)
  
  })
  
// Obtengo producto segun su id 

  router.get('/:id', async (req,res)=>{
  
      let getAllProducts = await FileDataNueva.getAll();
      let id = Math.floor(Math.random()*getAllProducts.length)
      let getId = await FileDataNueva.getById(id)
      res.send(getId) 
     
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

   

  })

  // Elimina segun id

  router.delete('/deleteId/:id', (req,res)=>{

    let Allproducts = await FileDataNueva.getAll();
    delete Allproducts.id;
    //revisar este
  })

export default router;