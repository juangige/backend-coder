import express from "express";
import __dirname from "./dirname.js";
import productsRoutes from "./Routes/products.routes.js";
import cartsRoutes from "./Routes/carts.routes.js";
import handlebars  from "express-handlebars";
import Handlebars from "handlebars";
import viewsRoutes from "./Routes/views.routes.js";
import mongoose from "mongoose";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import  authRoutes  from "./Routes/auth.routes.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
 
const app = express();
const PORT = 5000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/dbproductos')
.then(() => console.log("Conectado a la base de datos"))
.catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "../public"));
app.use(cookieParser()); // Cookies

// Passport
initializePassport();
app.use(passport.initialize());

// Configuracion de js
app.use('/public', express.static('public', {
    setHeaders: (res, path) => {
        if(path.endsWith('.js')){
            res.setHeader('Content-Type', 'text/javascript')
        }
    }
}));

// Configuracion de Handlebars
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

// Setear el engine en express
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);


 app.listen(PORT, () => {
     console.log(`Server running on port http://localhost:${PORT}`);
  });


// Routes
app.use("/api/products", productsRoutes);
app.use("/api/products/:productId", productsRoutes);
// Routes Carts
app.use("/api/carts", cartsRoutes);
app.use("/api/carts/:cartId/products/:productId", cartsRoutes);
// Routes Views
app.use("/", viewsRoutes);
app.use("/realtimeproducts", viewsRoutes);
app.use("/products", viewsRoutes);
// Routes Auth
app.use("/api/auth", authRoutes);

