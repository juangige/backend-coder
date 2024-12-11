import __dirname from "../dirname.js"

const opts = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Backend E-commerce de Coderhouse.",
            description: "Documentación de CRUD"
        }
    },
    apis: [`${__dirname}/docs/*.yaml`] 
};

export default opts