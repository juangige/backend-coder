import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/products.service.js";
import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/products.model.js";


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
    
        // Verificar que los productos existan
        for (const item of products) {
          const product = await productModel.findById(item.product);
    
          if (!product) {
            return res.status(404).json({ error: `Producto con ID ${item.product} no encontrado` });
          }
        }
    
        // Crear el carrito
        const cart = await cartModel.create({ user: userId, products });
    
        res.status(201).json(cart);
      } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito", details: error.message });
      }
    }

    async update(req, res) {
      try {
        const { id } = req.params;  
        const { products } = req.body;  
     
        // Verificar que se proporcionen productos
        if (!products || products.length === 0) {
          return res.status(400).json({ message: "Se deben proporcionar productos." });
        }
    
        console.log("Actualizando carrito con ID:", id);
        console.log("Productos a actualizar:", products);
     
        // DB
        const updatedCart = await CartService.update(id, { products });
        if (!updatedCart) {
          return res.status(404).json({ message: "Carrito no encontrado" });
        }
     
        res.status(200).json({ message: "Carrito actualizado", cart: updatedCart });
      } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        res.status(500).json({ message: error.message });
      }
    }

    async deleteById(req, res) {
      try {
        const { id } = req.params;  
        console.log("Eliminando carrito con ID:", id);  
    
        const deletedCart = await CartService.delete(id);
        if (!deletedCart) {
          return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.status(200).json({ message: "Carrito eliminado", cart: deletedCart });
      } catch (error) {
        console.error("Error al eliminar el carrito:", error);
        res.status(500).json({ message: error.message });
      }
    }
    

    async deleteProduct(req, res) {
      try {
        const { id: cartId, productId } = req.params;
    
        if (!cartId || !productId) {
          return res.status(400).json({ message: "Se requiere cartId y productId en la URL" });
        }
    
        // Buscar el carrito
        const cart = await cartModel.findById(cartId);
        if (!cart) {
          return res.status(404).json({ message: "Carrito no encontrado" });
        }
    
        const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);
        if (productIndex === -1) {
          return res.status(404).json({ message: "El producto no se encuentra en el carrito" });
        }
        cart.products.splice(productIndex, 1);

        await cart.save();
    
        return res.json(cart);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async addProduct(req, res) {
      try {
        const { products } = req.body;
    
        if (!Array.isArray(products) || products.length === 0) {
          return res.status(400).json({
            error: "La lista de productos no puede estar vacía",
          });
        }
    
     
        const cart = await cartModel.findById(req.params.id);
        if (!cart) {
          return res.status(404).json({
            error: "No se encontró el carrito",
          });
        }
    
        for (const item of products) {
          const { product, quantity } = item;
    
          const productExists = await productModel.findById(product);
          if (!productExists) {
            return res.status(404).json({
              error: `Producto con ID ${product} no encontrado`,
            });
          }
    
          
          const isProductInCart = cart.products.find((p) => {
            return p.product.equals(product);
          });
    
          if (isProductInCart) {
            isProductInCart.quantity += quantity;
          } else {
            cart.products.push({
              product,
              quantity,
            });
          }
        }
        await cart.save();
    
        return res.json(cart);
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({
          error: "Error al agregar producto al carrito",
          details: error.message,
        });
      }
    }

    async purchase(req, res) {
      try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: 'Parámetro id no encontrado' });
        }
    
        const cart = await cartModel.findById(id).populate('products.product');
        if (!cart) {
          return res.status(400).json({ message: 'Carrito no encontrado' });
        }
    
        console.log("Carrito:", cart);
        console.log("Productos en carrito:", cart.products);
    
        const productWithoutStock = [];
        const products = await ProductService.getAll();
    
        console.log("Productos disponibles:", products);
    
        cart.products.forEach((p) => {
          if (p.product && p.product._id) {
            const product = products.find(product => product._id.toString() === p.product._id.toString());
            if (product && product.stock < p.quantity) {
              productWithoutStock.push({
                productId: p.product._id,
                productName: product.title,
                quantity: p.quantity,
                stock: product.stock
              });
            }
          } else {
            console.log("Producto o ID no definidos en carrito:", p);
          }
        });
    
        if (productWithoutStock.length > 0) {
          return res.status(400).json({ message: 'No hay stock suficiente de los siguientes productos', productWithoutStock });
        }
    
        // Descontar Stock
        const promises = cart.products.map(async (p) => {
          if (p.product && p.product._id) {
            return ProductService.discountStock(p.product._id, p.quantity);
          }
        });
    
        await Promise.all(promises);
    
        const amount = cart.products.reduce((acc, curr) => {
          if (curr.product && curr.product.price) {
            return acc + curr.product.price * curr.quantity;
          }
          return acc;
        }, 0);
    
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
        console.error("Error en purchase:", error);
        res.status(500).json({ message: error.message, code: error.code });
      }
    }
    
    
}

export const cartController = new CartsController();