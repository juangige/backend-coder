import { connect } from "mongoose";
import { config } from "../config/config.js";

export class MongoDBProvider {
    static #instance;

    constructor(){
        connect(config.MONGO_URL)
        .then(() => console.log("Conectado a la base de datos"))
        .catch((error) => console.log(error));

        console.log(config.MONGO_URL)
    }

    static getInstance(){
        if(this.#instance){
            console.log("Ya existe una instancia");
            return this.#instance
        }

        this.#instance = new MongoDBProvider();
        return this.#instance
    }
}