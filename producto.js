import fs from 'fs'
   


  export default class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.format = 'utf-8'
    }

getProducts = async () => {
      try{
        if (fs.existsSync(this.path)) {
        const content = await fs.promises.readFile(this.path, this.format);
        const products = JSON.parse(content);
        return products
        console.log(products);
      } else{
        return [];
      }
    }catch(error){
      console.log(error)
    }
  };

    getId =()=>{
        const contador = this.products.length
        const id = (contador>0) ? this.products[contador-1].id+1 : 1
        return id
    }


    getProductById = async (Id) => {
      let archivo = await fs.promises.readFile( this.path, this.format )
      let archivo2 = JSON.parse(archivo)
      const product = archivo2.find(prod => prod.id === Id);

      if (product) {
        console.log ("ID encontrado:..............")
        return product;
    } else {
        console.error("Not Found");
    }
  }


    addProduct = (title, description, price, thumbnail, stock,code )=>{
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.error("FAlTA completar campos");
            return;
        }


        const ValidarCode = this.products.some((product) => product.code === code);
        if (ValidarCode) {
            console.error("Ya existe este CODIGO");
            return;
        }
        
        const product = {
            id : this.getId(),
            title,
            description,
            price,
            thumbnail,
            stock,
            code
    
        }
        this.products.push(product)
        this.guardarArchivo()
    }

    guardarArchivo= () => {
        fs.writeFile(this.path, JSON.stringify(this.products), (error) => {
          if (error) {
            console.error("Error, no se pudo guardar los archivos");
          } else {
            console.log("productos guardados! ");
          }
        });
    }

    updateProduct = async (Id, updatedContent) => {
      try {
          const contenido = await fs.promises.readFile(this.path, this.format);
          let contenidoParse = JSON.parse(contenido);
          const archivoIndex = contenidoParse.findIndex((prod) => prod.id === Id);
          
          if (archivoIndex !== -1) {
              const { id: idExistente, code: codeExistente, ...propiedadExistente } = contenidoParse[archivoIndex];
              const productoNew = { id: idExistente, code: codeExistente, ...propiedadExistente, ...updatedContent };
              contenidoParse[archivoIndex] = productoNew;
              const actualizar = JSON.stringify(contenidoParse, null, 2); 
              
              await fs.promises.writeFile(this.path, actualizar, this.format);

              console.log("producto actualizado");
          } else {
              console.log("no se encontro el producto");
          }
          } catch (err) {
          console.log(err);
          }
      };



    deleteProduct = (id) => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products.splice(index, 1);
          console.log("Producto eliminado");
          this.guardarArchivo();
        } else {
          console.error("Producto no encontrado");
        }
      };

     
}


// const carro = new ProductManager ("ejemplo.txt")
// carro.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// carro.getProducts().then(products => { console.log(products); }) 

