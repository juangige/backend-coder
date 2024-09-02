import { CartService } from "../services/cart.service.js";

export class CartsController {
    async getAll(req, res) {
        try {
            const carts = await CartService.getAll();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { cartId } = req.params;
            const cart = await CartService.getById(cartId);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { products } = req.body;
            const newCart = await CartService.create({ products });
            res.status(201).json({ message: "Carrito creado", cart: newCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteById(req, res) {
        try {
            const { cartId } = req.params;
            const deletedCart = await CartService.delete(cartId);
            res.json(deletedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const { cartId } = req.params;
            const { productId } = req.body;
            const updateCart = await CartService.addProduct(cartId, productId);
            res.json(updateCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { cartId } = req.params;
            const updateCart = await CartService.update(cartId, req.body);
            res.json(updateCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const cartController = new CartsController();