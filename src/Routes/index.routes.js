import { Router } from "express";
import  authRoutes  from "./auth.routes.js";
import  productsRoutes from "./products.routes.js";
import  cartsRoutes  from "./carts.routes.js";
import  viewsRoutes  from "./views.routes.js";
import  userRoutes  from "./user.routes.js";
import { authenticate, authorizations } from "../middlewares/authorization.middleware.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/carts", authenticate("jwt"), authorizations(["user"]), cartsRoutes);
router.use("/views", viewsRoutes);
router.use("/user", authenticate("jwt"), authorizations(["admin"]), userRoutes);

export default router