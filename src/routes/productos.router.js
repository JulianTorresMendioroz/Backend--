import {Router} from 'express';
import Contenedor from '../contenedor/contenedor.js';

const router = Router();
const FileDataNueva = new Contenedor();

router.get('/',(req,res)=>{

  //res.send('Ruta base productos') 
  res.render('form.handlebars')
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

      let id = req.params.id;
      let Prods = await FileDataNueva.getById(id)
      res.send(Prods)

      /*let getAllProducts = await FileDataNueva.getAll();
      let idParam = req.params.id;
      let id = Math.floor(Math.random()*getAllProducts.length)
      let getId = await FileDataNueva.getById(id)
      res.send(getId) */
    }catch(error){
      console.log(`Error${error}`)
    }
     
  })

  // Recibe productos y agrega con id 

  router.post('/productos', async (req,res)=> { 

      let allProducts = await FileDataNueva.getAll();
      let ultimoId = 0

      if(allProducts.length) {
        ultimoId = allProducts[allProducts.length - 1].id
      }

      const nuevoProducto = {
        id: ultimoId + 1,
        title: req.body.title ? req.body.title : 'No hay título',
        price: req.body.price ? req.body.price : 0,
      } 

      await FileDataNueva.save(nuevoProducto)
      res.redirect('/')



    /*let producto = req.body;
    res.send({status: 'succes', message: 'Product added'});
    await FileDataNueva.save(producto) */
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