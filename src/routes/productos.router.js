import {Router} from 'express';
import Contenedor from '../contenedor/contenedor.js';


const router = Router();
const FileDataNueva = new Contenedor();

router.get('/',(req,res)=>{

  //res.send('Ruta base productos') 
  res.render('form.handlebars')
  })
// Obtengo todos los productos

router.get('/productos', async (req,res)=>{

    try{
      let getAllProducts = await FileDataNueva.getAll();
      //res.send(getAllProducts)
      console.log(getAllProducts);
      res.render('productos', { getAllProducts })

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

  router.post('/productos', async (req, res) => {
    try {
        const allProducts = await FileDataNueva.getAll()

        let lastID = 0

        if (allProducts.length) {
            lastID = allProducts[allProducts.length - 1].id
        }

        const newProduct = {
            id: lastID + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            
        }
        // console.log('newProduct',newProduct);
        await FileDataNueva.save(newProduct)
        res.redirect('/')
    }catch (error) {
        console.log(`ERROR POST /productos: ${error}`)
    }
})
  // Elimina segun id 

  router.delete('/:id', (req,res)=>{

    let id = req.params.id;
    
    FileDataNueva.deleteById(id);
 
   return res.json({Estado: "El id se eliminó" + " " + id})

  })

export default router;