import Joi from "joi";

export const productDto = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    stock: Joi.number().required()
})