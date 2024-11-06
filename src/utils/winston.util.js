import { createLogger, format, transports, addColors } from "winston";

const {colorize, simple} = format;
const {Console, File} = transports;

const level = {fatal: 0, error: 1, info: 2, http: 3}
const colors = {faltal: "red", error: "yellow", info: "blue", http: "green", http_api: "white"}
addColors(colors)

const wintonsLogger = createLogger({
    level,
    format: colorize(),
    transports:[
        new Console({ level: "http", format: simple()}), // Errores en consola
        new File({level: "error", format: simple(), filename: "./src/utils/errors/errors.log"}) // crear un archivo de errores
    ]
})

export default wintonsLogger;