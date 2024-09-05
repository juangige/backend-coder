import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new Schema(
    {
      name: { type: String, require: true },
      description: { type: String, require: true },
      price: { type: Number, require: true },
      image: { type: String, require: true },
      stock: { type: Number, require: true },
    },
    {
      timestamps: true,
    }
  );

productSchema.plugin(mongoosePaginate);


export const productModel = model(productCollection, productSchema);


