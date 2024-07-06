import { Schema, model } from 'mongoose';

const productCollection = 'products';

const productSchema = Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

export const productModel = model(productCollection, productSchema);


