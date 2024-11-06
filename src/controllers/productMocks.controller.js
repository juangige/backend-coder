import { faker } from "@faker-js/faker";
import { productModel } from "../models/products.model.js";

const createMockProduct = async (req, res) => {
    const title = "Tagine-Rubbed Venison Salad"
    const description = "An exquisite ostrich roast, infused with the essence of longan, slow-roasted to bring out its natural"
    const price = 99
    const thumbnail = faker.image.avatar();
    const code = 1111
    const stock = 99

    const data = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }

    const one = await productModel.create(data);
    return res.status(201).json({
        response: one,
        message: "Product Created"
    });
}

const createMocksProducts = async (req, res) => {
    const { quantity } = req.params
    for (let i = 0; i < quantity; i++) {
    const title = "Tagine-Rubbed Venison Salad"
    const description = "An exquisite ostrich roast, infused with the essence of longan, slow-roasted to bring out its natural"
    const price = 99
    const thumbnail = faker.image.avatar();
    const code = 1111
    const stock = 99

    const data = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    const one = await productModel.create(data)
    }
    return res.status(201).json({
        message: "Products Created: "+quantity
    })
}

export {createMockProduct, createMocksProducts}