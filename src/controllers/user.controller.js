import { userService } from "../services/user.service.js"; 
import { userModel } from "../models/user.model.js";

class UserController {
    async create(req, res) {
        const { first_name, last_name, email, password, age } = req.body;

        if(!first_name || !last_name || !email || !password || !age) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try{
            const user = await userService.create({ first_name, last_name, email, password, age });
            return res.status(201).json(user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try{
            const users = await userService.getAll();
            return res.status(200).json(users);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async findById(userId) {
        try {
            console.log("userId recibido:", userId);  // Verifica qué valor tiene userId
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error(`Usuario con ID ${userId} no encontrado`);
            }
            return user;
        } catch (error) {
            console.error("Error en findById:", error.message);  // Imprime el error detallado
            throw new Error("Error al obtener el usuario");
        }
    }

    async getByEmail(req, res) {
        const { email } = req.params;
        try{
            const user = await userService.getByEmail(email);
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
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

    async deleteById(req, res) {
        const { id } = req.params;
        try{
            const user = await userService.deleteById(id);
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const userController = new UserController();