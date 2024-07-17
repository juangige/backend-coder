import { Router } from 'express';
import __dirname from '../dirname.js';
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

router.get("/products", async (req, res) => {
    const data = {
        title: "Products"
    }
    const {page, limit} = req.query;

    try{
        const products = await productModel.paginate({}, {page, limit});
        res.render("products", {products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router