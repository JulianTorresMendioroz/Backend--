import { existsSync, promises } from 'fs';

const route = '../src/files/productos.txt'


class Contenedor { 
    
getAll = async() => {

    try {
    
        if(existsSync(route)){
            let fileDataProd = await promises.readFile(route, 'utf8')
            let productos = JSON.parse(fileDataProd)
           return productos;
            
        }else{

            return [];

        }
        
    }catch (error) {
        console.log("Error" + " " + error)
    }}

    save = async (prods) => {

        try {
        
         let productos = await this.getAll();
         if(productos.length===0){  
         prods.id = 1;
         productos.push(prods);
         await promises.writeFile(route,JSON.stringify(productos, null, '\t'))
         }else{
             prods.id = productos[productos.length-1].id+1;
             productos.push(prods);
             await promises.writeFile(route,JSON.stringify(productos, null, '\t'))
         }
        
        } catch (error) {

         console.log('No puedo escribir el error:' + error)
         
        }
     }

     getById = async(id) => { 

        try { 

             let productosId = await this.getAll();
            
            const getId = productosId.filter(item => item.id == id)
            return getId

        }catch(error){
            console.log('Hubo un error:' + error)

        }

     }

     deleteById = async(id) => {

        try{ 
        let data = await this.getAll();
        const nuevaDataId = data.filter(item => item.id != id)
        await promises.writeFile(route,JSON.stringify(nuevaDataId, null, '\t'))
        return 'Se elimino el id:' + id;
    
        }catch(error){

            console.log('Hubo un error' + error)
        }
     }
                    
     deleteAll = async () => {

        const arrayVacioRegistro = []
        await promises.writeFile(route,JSON.stringify(arrayVacioRegistro, null, '\t'))
        return 'Registros eliminados'

     }



}

export default Contenedor;

