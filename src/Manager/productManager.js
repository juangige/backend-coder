import fs from "fs";
import path from "path";
import __dirname from "../dirname.js";

class Product {
    constructor(title, description, price, thumbnail, code, stock, id, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }
}

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, "./db/productos.json");
        this.products = [];
        if(fs.existsSync(this.path)) { 
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.products = [];
            }
        } else  {
            console.log("El archivo no existe");
        }
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.length > 0) {
            product.id = this.products[this.products.length - 1].id + 1;
        } else {
            product.id = 1;
        }

        this.products.push(product);

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            console.log("Se agrego el producto");
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        if (isNaN(productId)) {
            console.log("El id debe ser un numero");
            return;
        }
        const product = this.products.find(product => product.id === Number(productId));

        if (!product) {
            console.log("No se encontró el producto");
            return;
        }
        return product;
    }

    async deleteProduct(id) {
        id = Number(id);
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return;
        }
        this.products.splice(productIndex, 1);

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            console.log("Se eliminó el producto");
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex(product => product.id === Number(id));
        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return null;
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            console.log("Se actualizó el producto");
            return this.products[productIndex];
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const productManager = new ProductManager();
export default productManager;



