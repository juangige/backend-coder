import { ProductService } from "../services/products.service.js";
import errors from "../utils/errors/errors.js";
import errorCustom from "../utils/errors/errorCustom.js";
import winstonLogger from "../utils/winston.util.js";

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
      if (!product) {
        errorCustom.newError(errors.error);
      } else {
        return res
          .status(200)
          .json({ message: "Producto Encontrado: ", product });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res, next) {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        errorCustom.newError(errors.error);
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

      if (!product) {
        errorCustom.newError(errors.error);
      } else {
        res.status(201).json({ message: "Producto Creado!", product });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { productId } = req.params;
      const { title, description, price, thumbnail, code, stock } = req.body;

      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (price) updateData.price = price;
      if (thumbnail) updateData.thumbnail = thumbnail;
      if (code) updateData.code = code;
      if (stock) updateData.stock = stock;

      const updateProduct = await ProductService.update(productId, updateData);

      if (!updateProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      } else {
        return res
          .status(200)
          .json({ message: "Producto Modificado", updateProduct });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.deleteById(productId);
      if (!product) {
        errorCustom.newError(errors.notFound);
      } else {
        return res.status(200).json({ message: "Producto Borrado", product });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const productsController = new ProductsController();
