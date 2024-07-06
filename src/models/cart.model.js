import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = Schema({
    products: [{product: String, quantity: Number}],
});

export const cartModel = model(cartCollection, cartSchema);
