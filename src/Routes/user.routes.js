import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", param("id").isMongoId(), userController.findById);
router.get("/email/:email", userController.getByEmail);
router.post("/", userController.create);
router.put("/:id", param("id").isMongoId(), userController.update);
router.delete("/:id", param("id").isMongoId(), userController.deleteById);

export default router;