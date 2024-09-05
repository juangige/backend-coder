import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = Schema({
  products: [{ product: { type: Schema.Types.ObjectId, ref: 'products' }, quantity: Number }],
  user: { type: Schema.Types.ObjectId, ref: 'users' } 
});

export const cartModel = model(cartCollection, cartSchema);
