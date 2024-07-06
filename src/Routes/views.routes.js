import { Router } from 'express';
import fs from 'fs';
import __dirname from '../dirname.js';
import path from 'path';
import { productModel } from '../models/products.model.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const data = await productModel.find();
        console.log(data);
        res.render("index", {data});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/realtimeproducts", (req, res) => {

    const data = {
        title: "Realtime Products",
    }

    res.render("realTimeProducts", {products});
})

export default router