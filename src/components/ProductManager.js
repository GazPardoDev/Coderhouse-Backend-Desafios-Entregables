// CODERHOUSE BACKEND / DESAFÍO 3 PRODUCTMANAGER SERVIDOR con EXPRESS / ALUMNO GASTÓN PARDO / COMISIÓN 52225

import {promises as fs} from "fs"

// const fs = require ('fs')

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products= []
    }

    #id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) =>{

        this.#id++;

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#id,
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }
    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("EL PRODUCTO NO SE HA ENCONTRADO")
        } else{
            console.log(respuesta3.find(product => product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        
        console.log("EL PRODUCTO HA SIDO ELIMINADO")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let oldProduct = await this.readProducts()
        //console.log(oldProduct)
        let modifiedProduct = [{ ...producto, id }, ...oldProduct];
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct));
      
    }

}

//const productos = new ProductManager

/*productos.addProduct("Titulo 1", "Descripción 1", 5500, "Thumb 1", "code001", 9)
productos.addProduct("Titulo 2", "Descripción 2", 7500, "Thumb 2", "code002", 3)
productos.addProduct("Titulo 3", "Descripción 3", 2200, "Thumb 3", "code003", 5)
productos.addProduct("Titulo 4", "Descripción 4", 1500, "Thumb 4", "code004", 2)
productos.addProduct("Titulo 5", "Descripción 5", 9000, "Thumb 5", "code005", 8)
productos.addProduct("Titulo 6", "Descripción 6", 4100, "Thumb 6", "code006", 4)
productos.addProduct("Titulo 7", "Descripción 7", 3300, "Thumb 7", "code007", 9)
productos.addProduct("Titulo 8", "Descripción 8", 3900, "Thumb 8", "code008", 2)
productos.addProduct("Titulo 9", "Descripción 9", 1200, "Thumb 9", "code009", 7)
productos.addProduct("Titulo 10", "Descripción 10", 8800, "Thumb 10", "code010", 6)
*/

//productos.getProducts()

//productos.getProductsById(3)

//productos.deleteProductsById(2)

/*productos.updateProducts({
    title: 'Titulo 1',
    description: 'Descripción 1',
    price: 20000,
    thumbnail: 'Thumb 1',        
    code: 'code001',
    stock: 9,
    id: 1
})
*/