import jwt from "jsonwebtoken";

export const JWT_SECRET = "p4ssw0rd_s3cr3t_t3st";

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