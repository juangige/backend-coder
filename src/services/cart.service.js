import { cartModel } from "../models/cart.model.js";
import { userService } from "./user.service.js";

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
        return await cartModel.findByIdAndUpdate(id, cart);
    },

    async delete(id) {
        return await cartModel.findByIdAndDelete(id);
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