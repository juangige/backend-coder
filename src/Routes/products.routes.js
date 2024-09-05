import { Router } from "express";
import { productsController as ProductsController } from "../controllers/products.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", ProductsController.getAll);
router.get("/:productId", param("id").isMongoId(), ProductsController.getById);
router.delete("/:productId", ProductsController.deleteById);
router.put("/:productId", ProductsController.update);
router.post("/", ProductsController.create);


export default router;
