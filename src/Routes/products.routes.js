import { Router } from 'express';
import productManager from '../Manager/productManager.js';
import { Server } from "socket.io";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", (req, res, next) => {
    const products = productManager.getProducts();
    res.json(products);
});

// Ruta para obtener por ID
router.get("/:productId", (req, res, next) => {
    const { productId } = req.params;
    const product = productManager.getProductById(productId);

    if(!product) {
        return res.status(404).json({ message: "No se encontro el producto" });
    }

    res.json(product);
})

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true
    };

    await productManager.addProduct(product);
    res.status(201).json({ message: "Producto Creado!" });

    const products = productManager.getProducts();

    io.emit("productsList", products);

});
// Ruta para actualizar un producto
router.put("/:productId", async (req, res) => {
    const { productId } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;

    // Verificar que los campos obligatorios estén presentes
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const updatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    const product = await productManager.updateProduct(productId, updatedProduct);
    if (!product) {
        return res.status(404).json({ message: "No se encontró el producto" });
    }

    res.json({ message: "Producto actualizado", product });
});

router.delete("/:productId", async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await productManager.deleteProduct(productId);
    res.json({ message: "Producto eliminado" });
    
    if (!deletedProduct) {
        return res.status(404).json({ message: "No se encontró el producto 1" });
    }
});

export default router;

