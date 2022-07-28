import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";
import { existsSync, promises } from 'fs';

let dataContendor = new Contenedor();

const router = Router();

router.get('/', (req, res)=>{
    
    res.render('form',{})
})

router.get('/productos', async (req, res)=>{
    let productos = await dataContendor.getAll();
    res.render('productos',{
        hasProducts:productos.length>0,
        productos
    })
})

export default router;