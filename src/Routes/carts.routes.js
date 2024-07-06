import { Router } from "express";
import { cartModel } from "../models/cart.model.js"

const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json({ message: "Carrito creado", cart: newCart });
});

// Ruta para obtener los carritos
router.get("/", async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ruta para obtener productos de un carrito específico
router.get("/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartModel.findById(cartId);
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ruta para agregar un producto a un carrito específico
router.post("/:cartId/product/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await cartModel.findById(cartId);
        cart.products.push({ product: productId, quantity: 1 });
        await cart.save();
        res.json(cart.products); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;


