import ArchivoManager from "./archivo.manager.js";


export default class ProductManager extends ArchivoManager {
    constructor() {
        super('./products.json')
    }
    create = async (data) => {
        const result = await this.set(data)
        return result;
    }
    list = async (limit) => {
        const result = await this.get();
        if (limit) {
            return result.slice(0, limit);
        }
        return result;
    }
    updateProduct = async (data, id) => {
        let productExist = await this.getById(id)
        if(!productExist){
            const error=  new Error('id no encontrado')
            error.status=404;
            throw error;
        }
        await this.update(data, id);
        return productExist;
    }
    deleteProduct = async (id) => {
        if(!productExist){
            const error=  new Error('producto no encontrado')
            error.status=404;
            throw error;
        }
        await this.delete(id);
        return productExist;
    };
}