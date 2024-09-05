import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            secure: false,                
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            },
            tls: {
                rejectUnauthorized: false   
            }
        });
    }
    async sendMail(to, subject, html) {
        console.log("Preparando para enviar correo a:", to);
        try {
            const info = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html
            });
            console.log("Correo enviado con éxito:", info);
        } catch (error) {
            console.error("Error al enviar correo:", error);
        }
    }
}

export const mailService = new MailService();