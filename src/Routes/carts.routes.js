import { Router } from "express";
import cartManager from "../Manager/cartManager.js";

const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    const newCart = await cartManager.addCart();
    if (!newCart) {
        return res.status(500).json({ message: "Error al crear el carrito" });
    }
    res.status(201).json({ message: "Carrito creado", cart: newCart });
});

// Ruta para obtener productos de un carrito específico
router.get("/:cartId", (req, res) => {
    const { cartId } = req.params;
    const cart = cartManager.getCartById(Number(cartId));

    if (!cart) {
        return res.status(404).json({ message: "No se encontró el carrito" });
    }

    res.json(cart.products);
});

// Ruta para agregar un producto a un carrito específico
router.post("/:cartId/product/:productId", async (req, res) => {
    const { cartId, productId } = req.params;
    const updatedCart = await cartManager.addProductToCart(Number(cartId), Number(productId));

    if (!updatedCart) {
        return res.status(404).json({ message: "No se encontró el carrito o hubo un error al agregar el producto" });
    }

    res.json({ message: "Producto añadido al carrito", cart: updatedCart });
});

export default router;


