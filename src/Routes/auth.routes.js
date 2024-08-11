import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
      session: false,
      failureRedirect: "/api/auth/login-fail",
  }),
  authController.login
);
router.get("/login-fail", authController.loginFail);

//
router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/register-fail",
  }),
  async (req, res) => {
    res.json({ message: "Usuario creado" });
  }
);
router.get("/register-fail", (req, res) => {
  res.json({ message: "Hubo un error en el Registro" });
});


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authController.current
);

router.get("/logout", authController.logout);



export default router;
