import { Router } from 'express';
import { productModel } from '../models/products.model.js';

const router = Router();



// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
    try{
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});
    

// Ruta para obtener por ID
router.get("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const product = await productModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        });
        res.status(201).json({ message: "Producto Creado!" });
        }
         catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Ruta para actualizar un producto
router.put("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, description, price, thumbnail, code, stock } = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(productId, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })
        res.json({ message: "Producto actualizado", product: updateProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        res.json({ message: "Producto eliminado", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

