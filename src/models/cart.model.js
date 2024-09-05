import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = Schema({
  products: [{ product: String, quantity: Number }],
  user: { type: Schema.Types.ObjectId, ref: 'users' } 
});

export const cartModel = model(cartCollection, cartSchema);
