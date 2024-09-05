import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dto/auth.dto.js";
import { userDto } from "../dto/user.dto.js";
import { authenticate } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(authDto),
  authenticate("login"),
  authController.login
);
router.get("/login-fail", authController.loginFail);

//
router.post(
  "/register",
  validate(userDto),
  authenticate("register"),
  authController.register
);
router.get("/register-fail", (req, res) => {
  res.json({ message: "Hubo un error en el Registro" });
});


router.get(
  "/current",
  authenticate("jwt", { session: false }),
  authController.current
);

router.get("/logout", authController.logout);



export default router;
