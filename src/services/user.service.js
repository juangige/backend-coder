import { userModel } from "../models/user.model.js";

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
}