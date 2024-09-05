import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/products.service.js";
import { userService as UserService } from "../services/user.service.js";
import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";
import { cartModel } from "../models/cart.model.js";
import { userController } from "./user.controller.js";

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
      try{
        const { id } = req.params;
        const cart = await cartModel.findById(id);
        res.json(cart);
      } catch(error) {
        res.status(500).json({ message: error.message });
      }
    }

    async create(req, res) {
      try {
        const userId = req.user._id; 

        const { products } = req.body;
    
        
        const cart = await cartModel.create({ 
          user: userId,
          products 
        });
    
        res.status(201).json(cart);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error al crear el carrito", details: error.message });
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

    async deleteProduct(req, res) {
        try {
            const { cartId, productId } = req.params;

            const productInCart = cart.products.find((product) => product.product == productId);
            if (!productInCart) {
                return res.status(400).json({ message: "El producto no se encuentra en el carrito" });
            } else {
                const updateCart = await CartService.deleteProduct(cartId, productId);
                res.json(updateCart);
            
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 

    async addProduct(req, res) {
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

    async purchase(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            return res.status(400).json({ message: 'Parámetro id no encontrado' });
          }
      
          const cart = await CartService.getById(id).populate("products.product");
          if (!cart) {
            return res.status(400).json({ message: 'Carrito no encontrado' });
          }
      
          const productWithoutStock = [];
          const products = await ProductService.getAll();
      
          cart.products.forEach((p) => {
            const product = products.find((product) => product._id.toString() === p.product._id.toString());
            if (product && product.stock < p.quantity) {
              productWithoutStock.push({
                productId: p.product._id,
                productName: product.title,
                quantity: p.quantity,
                stock: product.stock
              });
            }
          });
      
          if (productWithoutStock.length > 0) {
            return res.status(400).json({ message: 'No hay stock suficiente de los siguientes productos', productWithoutStock });
          }
      
          // Descontar Stock
          const promises = cart.products.map(async (p) => {
            return ProductService.discountStock(p.product._id, p.quantity);
          });
      
          await Promise.all(promises);
      
          const amount = cart.products.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
          if (amount < 0) {
            return res.status(400).json({ message: 'Monto inválido' });
          }
      
          // Generar orden
          const order = await ticketModel.create({
            code: uuidv4(),
            purchase_date: Date.now(),
            amount,
            purchaser: req.user._id
          });
      
          res.status(201).json({ message: 'Orden generada', order });
        } catch (error) {
          res.status(500).json({ message: error.message, code: error.code });
        }
      }

}

export const cartController = new CartsController();