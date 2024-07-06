import express from "express";
import __dirname from "./dirname.js";
import productsRoutes from "./Routes/products.routes.js";
import cartsRoutes from "./Routes/carts.routes.js";
import Handlebars  from "express-handlebars";
import viewsRoutes from "./Routes/views.routes.js";
import mongoose from "mongoose";

 
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/dbproductos')
.then(() => console.log("Conectado a la base de datos"))
.catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "../public"));

// Configuracion de js
app.use('/public', express.static('public', {
    setHeaders: (res, path) => {
        if(path.endsWith('.js')){
            res.setHeader('Content-Type', 'text/javascript')
        }
    }
}));

// Configuracion de Handlebars
app.engine("hbs", Handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
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

