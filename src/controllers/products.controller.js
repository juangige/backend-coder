import { ProductService } from "../services/products.service.js";

export class ProductsController {
  async getAll(req, res) {
    const { page, limit, query } = req.query;
    try {
      const products = await ProductService.getAll({}, { limit, page });
      res.json({
        status: "success",
        payload: products,
        ...products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getById(productId);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res
          .status(400)
          .json({ message: "Todos los campos son requeridos" });
      }

      const product = await ProductService.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,
      });
      res.status(201).json({ message: "Producto Creado!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { productId } = req.params;
      const { title, description, price, thumbnail, code, stock } = req.body;
      const updateProduct = await ProductService.update(productId, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      res.json(updateProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.deleteById(productId);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const productsController = new ProductsController();