import { connect } from "mongoose";
import env from '../utils/env.utils.js'

export class MongoDBProvider {
    static #instance;

    constructor(){
        connect(env.MONGO_URL)
        .then(() => console.log("Conectado a la base de datos"))
        .catch((error) => console.log(error));
    
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