import { existsSync, promises } from 'fs';



const route = './src/files/productos.txt'


class Contenedor { 

   
   getAll = async() => {

        try {
        
            existsSync(route);{
                let fileDataProd = await promises.readFile(route, 'utf8')
                let productos = JSON.parse(fileDataProd)
                return productos; 
                 }
      
            
        }catch (error) {
            console.log("Error" + " " + error)
        }
    }
 
    save = async (prods) => {

        try {
        
         let productos = await this.getAll();
         if(productos.length===0){  
         prods.id = 1;
         await promises.writeFile(route,JSON.stringify(prods, null, '\t'))
         }else{
             prods.id = productos[productos.length-1].id+1;
            await promises.writeFile(route,JSON.stringify(prods, null, '\t'))
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

     updateId = async(id, title, price) =>{
        const data = await this.getById();
        console.log('data: ',data)
        console.log('id: ',id)
        let item = data.find(producto => producto.id == id);
        
        
        console.log(item)
        if (item) {
            item.title = title;
            item.price = price;
        }   
        
        let itemidex = data.findIndex(producto => parseInt(producto.id) === parseInt(item.id));
        console.log(itemidex)
        data.splice(itemidex, 1, item);
        console.log('NEW data: ',data)
        await this.deleteAll();
        await this.save(data);
    }


}

export default Contenedor;

