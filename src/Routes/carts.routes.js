import { Router } from "express";
import { param } from "express-validator";
import { cartController as CartsController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartsController.getAll);
router.get("/:id", param("cartId").isMongoId(), CartsController.getById);
router.post("/", CartsController.create);
router.put("/:id", CartsController.update);
router.delete("/:id", CartsController.deleteById);
router.post("/:id/products/", CartsController.addProduct);
router.post("/:id/purchase", CartsController.purchase);

export default router;


