import __dirname from "../dirname.js"

const opts = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Products",
            description: "Documentación de CRUD de productos"
        }
    },
    apis: [`${__dirname}/docs/*.yaml`] // Ajusta la ruta si el archivo no está aquí
};

export default opts