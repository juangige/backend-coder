import { productModel } from "../models/products.model.js";

export const ProductService = {
  async getAll() {
    return await productModel.find();
  },

  async getById(id) {
    return await productModel.findById(id);
  },

  async create(product) {
    return await productModel.create(product);
  },

  async update(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  },

  async delete(id) {
    return await productModel.findByIdAndDelete(id);
  },

  async deleteById(id) {
    return await productModel.findByIdAndDelete(id);
  },
  async discountStock(id, quantity) {
    return await productModel.findByIdAndUpdate(id, {
      $inc: { stock: -quantity },
    });
  },
  async update(id, updateData) {
    // Actualiza solo los campos que vienen en el objeto updateData
    return await productModel.findByIdAndUpdate(id, updateData, { new: true });
  },
};
