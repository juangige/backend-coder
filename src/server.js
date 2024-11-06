import express from "express";
import __dirname from "./dirname.js";
import handlebars  from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { MongoDBProvider } from "./providers/mongodb.provider.js";
import routes from "./Routes/index.routes.js";
import cors from "cors";
import args from "./utils/args.utils.js"
import winston from "./middlewares/winstonLogger.midleware.js";

 
const app = express();
const whiteList = [ 'http://localhost:5000', 'http://localhost:5173' ]
console.log(args);

// Argumentos
const port = args.p
const mode = args.mode

// MongoDB Provider
MongoDBProvider.getInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "../public"));
app.use(cookieParser()); // Cookies
app.use(cors({
    origin: whiteList,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(winston)


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

// Routes
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port} on `+mode);
 });
