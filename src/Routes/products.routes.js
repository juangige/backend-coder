import { Router } from "express";
import { productsController as ProductsController } from "../controllers/products.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", ProductsController.getAll);
router.get("/:productId", param("id").isMongoId(), ProductsController.getById);
router.post("/", ProductsController.create);
router.put("/:productId", ProductsController.update);
router.delete("/:productId", ProductsController.deleteById);


// // Ruta para obtener todos los productos con filtros
// router.get("/", async (req, res) => {
//   const { page, limit, query } = req.query;
//   try {
//     const products = await productModel.paginate({}, { limit, page });
//     res.json({
//       status: "success",
//       payload: products,
//       ...products,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para obtener por ID
// router.get("/:productId", async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const product = await productModel.findById(productId);
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para agregar un nuevo producto
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     if (!title || !description || !price || !thumbnail || !code || !stock) {
//       return res
//         .status(400)
//         .json({ message: "Todos los campos son requeridos" });
//     }

//     const product = await productModel.create({
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//       status: true,
//     });
//     res.status(201).json({ message: "Producto Creado!" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para actualizar un producto
// router.put("/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     const updateProduct = await productModel.findByIdAndUpdate(productId, {
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//     });
//     res.json({ message: "Producto actualizado", product: updateProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const deletedProduct = await productModel.findByIdAndDelete(productId);
//     res.json({ message: "Producto eliminado", product: deletedProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
