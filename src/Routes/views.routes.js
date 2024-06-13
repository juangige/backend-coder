import { Router } from 'express';
import fs from 'fs';
import __dirname from '../dirname.js';
import path from 'path';

const router = Router();

const loadProducts = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'db', 'productos.json'), 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        return [];
    }
};

let products = loadProducts();

router.get("/", (req, res) => {
    
    const data = {
        title: "Bienvenidos",
        name: "Juan Gigena"
    }

    res.render("index", data);
})

router.get("/realtimeproducts", (req, res) => {

    const data = {
        title: "Realtime Products",
    }

    res.render("realTimeProducts", {products});
})

export default router