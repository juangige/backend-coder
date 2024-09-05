import { createToken } from "../utils/jwt.js";
import { mailService } from "../services/mail.service.js";
class AuthController {
    async login(req, res) {
        try{
        const payload = {
            email: req.user.email,
            role: req.user.role,
        };

        const token = createToken(payload);

        res.cookie("coderToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 24hs
        });

        res.status(200).json({ message: "Login exitoso", token: token });
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Login fallido" });
        }
        
    }

    async register(req, res) {
        try {
            const user = req.user;
            await mailService.sendMail(
                user.email,
                "New user registered",
                `<h1>New user registered</h1><p>Name: ${user.first_name}</p><p>Email: ${user.email}</p>`
            );

            res.status(201).json({
                message: "Registro exitoso. Correo enviado.",
                user
            });
        } catch (error) {
            console.error("Error en el registro o envío de correo:", error);
            res.status(401).json({ message: "Registro fallido" });
        }
    }

    async loginFail(req, res) {
        res.status(401).json({ message: "Login fallido" });
    }

    async registerFail(req, res){
        res.status(401).json({ message: "Registro fallido" });
    }

    async current (req, res){
        try{
            res.json(req.user);
        }   catch (error) {
            res.status(401).json({ message: "Login fallido" });
        }
    }

    async logout (req, res){
        res.clearCookie("coderToken");
        res.status(200).json({ message: "Logout exitoso" });
    }
    }



export default new AuthController();