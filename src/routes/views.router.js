import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";

let dataContendor = new Contenedor();

const router = Router();

router.get('/', (req, res)=>{
    
    res.render('form',{})
})

router.get('/productos', async (req, res)=>{
    let prods = await dataContendor.getAll();
    res.render('productos',{
        hasProducts:prods.length>0,
        prods
    })
})

export default router;