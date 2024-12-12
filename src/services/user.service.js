import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Contraseña incorrecta");
            }

            return user; 
        } catch (error) {
            throw new Error(error.message); 
        }
    },

    findByEmail: async (email) => {
        try {
            return await userModel.findOne({ email }); 
        } catch (error) {
            throw new Error('Error al buscar el usuario');
        }
    },
};
