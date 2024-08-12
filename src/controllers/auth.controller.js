import { createToken } from "../utils/jwt.js";

class AuthController {
    async login(req, res) {
        const { email, role } = req.user; // Usar los datos del usuario autenticado

        const payload = {
            email,
            role
        };

        const token = createToken(payload);

        res.cookie("coderToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 24hs
        });

        res.status(200).json({ message: "Login exitoso" });
    }

    async loginFail(req, res) {
        res.status(401).json({ message: "Login fallido" });
    }

    async registerFail(req, res){
        res.status(401).json({ message: "Registro fallido" });
    }

    async current (req, res){
        res.json({message: "usuario autenticado", user: req.user});
    }

    async logout (req, res){
        res.clearCookie("coderToken");
        res.status(200).json({ message: "Logout exitoso" });
    }
    }



export default new AuthController();