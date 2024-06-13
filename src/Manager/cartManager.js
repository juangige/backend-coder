import fs from "fs";
import path from "path";
import __dirname from "../dirname.js";

class CartManager {
    constructor() {
        this.path = path.join(__dirname, "./db/cart.json");
        if (fs.existsSync(this.path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }

    async addCart() {
        const newCart = { id: this.carts.length + 1, products: [] };
        this.carts.push(newCart);

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );
            return newCart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getCartById(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }

    async addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex === -1) {
            cart.products.push({ product: productId, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const cartManager = new CartManager();
export default cartManager;


