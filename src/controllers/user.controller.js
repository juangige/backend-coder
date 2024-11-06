import { userService } from "../services/user.service.js"; 
import { userModel } from "../models/user.model.js";
import errors from '../utils/errors/errors.js'
import errorCustom from '../utils/errors/errorCustom.js'
import winstonLogger from "../utils/winston.util.js";

class UserController {
    async create(req, res) {
        const { first_name, last_name, email, password, age } = req.body;

        if (!first_name || !last_name || !email || !password || !age) {
            errorCustom.newError(errors.error)
        }

        try {
            const user = await userService.create({ first_name, last_name, email, password, age });
            return res.status(201).json(user);
        } catch (error) {
            console.error("Error en create:", error);

            return res.status(500).json({ message: error.message });
        }
        
    }

    async getAll(req, res) {
        try{
             
            const users = await userService.getAll();
            winstonLogger.info(users)
            if(users.length > 0){
                return res.status(200).json({message: "Usuarios:", users})
            } else {
                errorCustom.newError(errors.notFound)
            }

        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async findById(userId, next) {
        try {
            console.log("userId recibido:", userId);  // Verifica qué valor tiene userId
            const user = await userModel.findById(userId);
            if (!user) {
                errorCustom.newError(errors.notFound)
            }
            return user;
        } catch (error) {
            return next(error)
        }
    }

    async getByEmail(req, res, next) {
        const { email } = req.params;
        try{
            const user = await userService.getByEmail(email);
            if(!user){
                errorCustom.newError(errors.error)
            } else {
                return res.status(200).json(user);
            }
        } catch(error) {
            return next(error)
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { first_name, last_name, email, password, age } = req.body;
        try{
            const user = await userService.update(id, { first_name, last_name, email, password, age });
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteById(req, res, next) {
        const { id } = req.params;
        try{
            const user = await userService.deleteById(id);
            if(!user) {
                errorCustom.newError(errors.notFound)
            } else{
                return res.status(200).json(user);
            }
        } catch(error) {
            return next(error)
        }
    }
}

export const userController = new UserController();