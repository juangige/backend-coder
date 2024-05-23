import express from "express";
import __dirname from "./dirname.js";
import productsRoutes from "./Routes/products.routes.js";
import cartsRoutes from "./Routes/carts.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/products/:productId", productsRoutes);
// Routes Carts
app.use("/api/carts", cartsRoutes);
app.use("/api/carts/:cartId/products/:productId", cartsRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));