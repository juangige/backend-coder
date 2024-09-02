import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", param("id").isMongoId(), userController.getById);
router.get("/email/:email", userController.getByEmail);
router.post("/", userController.create);

export default router;