import { Router } from "express";
import { createMock, createMocks } from "../controllers/userMocks.controller.js";
import { createMockProduct, createMocksProducts } from '../controllers/productMocks.controller.js';


const router = Router();

router.get("/user", createMock)
router.get("/user/:quantity", createMocks)
router.get("/product", createMockProduct)
router.get("/product/:quantity", createMocksProducts)

export default router