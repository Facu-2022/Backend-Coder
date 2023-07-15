import ArchivoManager from "./archivo.manager.js";


export default class ProductManager extends ArchivoManager {
    constructor() {
        super('./products.json')
    }
    create = async (data) => {
        const result = await this.set(data)
        return result
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
            throw new Error('id no encontrado', 404)
        }
        await this.update(data, id);
        return productExist;
    }
    deleteProduct = async (id) => {
        let productExist = await this.getById(id);
        if (!productExist) {
            throw new Error('Producto no encontrado', 404);
        }
        await this.delete(id);
        return productExist;
    };
}