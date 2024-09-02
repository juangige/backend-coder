import { Router } from "express";
import { param } from "express-validator";
import { cartController as CartsController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartsController.getAll);
router.get("/:cartId", param("cartId").isMongoId(), CartsController.getById);
router.post("/", CartsController.create);
router.put("/:cartId", CartsController.update);
router.delete("/:cartId", CartsController.deleteById);


// Ruta para crear un nuevo carrito
// router.post("/", async (req, res) => {
//     const newCart = await cartModel.create({ products: [] });
//     res.status(201).json({ message: "Carrito creado", cart: newCart });
// });

// // Ruta para obtener los carritos
// router.get("/", async (req, res) => {
//     try {
//         const carts = await cartModel.find();
//         res.json(carts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// // Ruta para obtener productos de un carrito específico
// router.get("/:cartId", async (req, res) => {
//     try {
//         const { cartId } = req.params;
//         const cart = await cartModel.findById(cartId);
//         res.json(cart.products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// // Ruta para agregar un producto a un carrito específico
// router.post("/:cartId/product/:productId", async (req, res) => {
//     try {
//         const { cartId, productId } = req.params;
//         const cart = await cartModel.findById(cartId);
//         cart.products.push({ product: productId, quantity: 1 });
//         await cart.save();
//         res.json(cart.products); 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// // Ruta para eliminar un producto de un carrito
// router.delete("/:cartId/products/:productId", async (req, res) => {
//     try {
//         const { cartId, productId } = req.params;
//         const cart = await cartModel.findById(cartId);
//         cart.products = cart.products.filter((product) => product.product != productId);
//         await cart.save();
//         res.json(cart.products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })
// // Ruta para eliminar un carrito
// router.delete("/:cartId", async (req, res) => {
//     try {
//         const { cartId } = req.params;
//         const cart = await cartModel.findByIdAndDelete(cartId);
//         res.json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// // Ruta para actualizar productos de un carrito
// router.put("/carts/:cartId/products/:productId", async (req, res) => {
//     try{
//         const { cartId, productId } = req.body;
//         const cart = await cartModel.findById(cartId);
//         cart.products = cart.products.filter((product) => product.product != productId);
//         await cart.save();
//         res.json(cart.products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })
// // Ruta para actualizar un carrito
// router.put("/:cartId", async (req, res) => {
//     try {
//         const { cartId } = req.params;
//         const { products } = req.body;
//         const updateCart = await cartModel.findByIdAndUpdate(cartId, { products });
//         res.json({ message: "Carrito actualizado", cart: updateCart });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

export default router;


