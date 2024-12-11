import { Router } from "express";
import { param } from "express-validator";
import { cartController, cartController as CartsController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartsController.getAll);
router.get("/:id", param("cartId").isMongoId(), CartsController.getById);
router.post("/", CartsController.create);
router.post("/:id/products/", CartsController.addProduct);
router.post("/:id/purchase", CartsController.purchase);
router.delete("/:id/products/:productId", CartsController.deleteProduct);
router.delete("/:id", CartsController.deleteById);
router.put("/:id", cartController.update);

export default router;


