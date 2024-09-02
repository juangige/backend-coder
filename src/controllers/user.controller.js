import { userService } from "../services/user.service.js"; 

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

    async getById(req, res) {
        const { id } = req.params;
        try{
            const user = await userService.getById(id);
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
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
}

export const userController = new UserController();