import { Router } from "express";
import { param } from "express-validator";
import { cartController as CartsController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartsController.getAll);
router.get("/:cartId", param("cartId").isMongoId(), CartsController.getById);
router.post("/", CartsController.create);
router.put("/:cartId", CartsController.update);
router.delete("/:cartId", CartsController.deleteById);
router.post("/:id/purchase", CartsController.purchase);

export default router;


