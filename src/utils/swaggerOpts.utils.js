import __dirname from "../dirname.js"

const opts ={
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Products",
            description: "Documentacion de CRUD de productos"
        }
    },
    apis: [`${__dirname}/src/docs/*.yaml`]
}

export default opts