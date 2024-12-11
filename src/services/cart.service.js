import { cartModel } from "../models/cart.model.js";

export const CartService = {
    async getAll() {
        return await cartModel.find();
    },

    async getById(id) {
        return await cartModel.findById(id); 
      },
    
    async create(cart) {
        return await cartModel.create(cart);
      },

      async update(id, cart) {
        const updatedCart = await cartModel.findByIdAndUpdate(id, { products: cart.products }, { new: true });
        return updatedCart;
      },

    async delete(id) {
        const deletedCart = await cartModel.findByIdAndDelete(id);
        return deletedCart;
      },

    async addProduct(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        cart.products.push(productId);
        return await cartModel.findByIdAndUpdate(cartId, cart);
    },
    
    async purchase(cartId) {
        const cart = await cartModel.findById(cartId);
        cart.products = [];
        return await cartModel.findByIdAndUpdate(cartId, cart);
    }

}