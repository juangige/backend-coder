import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(payload){
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    return token;
}

export function verifyToken(token){
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch(error){
        throw new Error(`Token Invalido: ${error}`);
    }
}