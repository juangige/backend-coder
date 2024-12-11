import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const userService = {

    async create(user) {
        return await userModel.create(user);
    },

    async getAll() {
        return await userModel.find();
    },

    async getById(id) {
        return await userModel.findById(id);
    },

    async getByEmail(email) {
        return await userModel.findOne({ email });
    },

    async deleteById(id) {
        return await userModel.deleteOne({ _id: id });
    },

    async update(id, updateData) {
        return await userModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
    },

    async findByEmailAndPassword(email, password) {
        try {
            // Buscar al usuario por su email
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            // Aquí deberías agregar la lógica para comparar las contraseñas, por ejemplo con bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Contraseña incorrecta");
            }

            return user; // Si las credenciales son correctas, devuelve el usuario
        } catch (error) {
            throw new Error(error.message); // Propaga el error
        }
    },

    findByEmail: async (email) => {
        try {
            return await userModel.findOne({ email }); // Usa userModel en lugar de User
        } catch (error) {
            throw new Error('Error al buscar el usuario');
        }
    },
};
