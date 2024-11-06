import { Router } from "express";
import  authRoutes  from "./auth.routes.js";
import  productsRoutes from "./products.routes.js";
import  cartsRoutes  from "./carts.routes.js";
import  viewsRoutes  from "./views.routes.js";
import  userRoutes  from "./user.routes.js";
import { authenticate, authorizations } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dto/cart.dto.js";
import userMocks from "./mocks.routes.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/carts", authenticate("jwt"), validate(cartDto), cartsRoutes);
router.use("/views", viewsRoutes);
router.use("/user", authenticate("jwt"), authorizations(["admin"]), userRoutes);
router.use("/products",
    authenticate("jwt"),
    authorizations(["admin"]),
     productsRoutes);

// Mocks

router.use("/mocks", userMocks)


export default router