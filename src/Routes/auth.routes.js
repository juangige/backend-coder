import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dto/auth.dto.js";
import { userDto } from "../dto/user.dto.js";
import { authenticate } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(authDto),
  authenticate("login"),
  AuthController.login
);
router.get("/login-fail", AuthController.loginFail);

//
router.post(
  "/register",
  validate(userDto),
  authenticate("register"),
  AuthController.register
);
router.get("/register-fail", (req, res) => {
  res.json({ message: "Hubo un error en el Registro" });
});


router.get(
  "/current",
  authenticate("jwt", { session: false }),
  AuthController.current
);

router.get("/logout", AuthController.logout);



export default router;
