import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "cambia_esto_por_un_secreto_seguro";
const JWT_EXPIRES_IN = "7d"; // El token dura 7 días

// Configuración de la cookie
const COOKIE_OPTIONS = {
    httpOnly: true,    // No accesible desde JavaScript del navegador (protege de XSS)
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
    sameSite: "strict", // Protege contra CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
};

/**
 * POST /auth/login
 * Verifica credenciales, genera JWT y lo guarda en cookie httpOnly.
 */
async function login(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Credenciales inválidas.", code: "00" });
    }

    try {        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Credenciales incorrectas", code: "01"});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Credenciales incorrectas", code: "02"});
        }
        
        console.log("Login:", {
            message: "Succesful login",
            user: { id: user.idUser, name: user.firstName },
        });

        // Generar JWT con datos básicos del usuario (nunca incluyas la contraseña)
        const token = jwt.sign(
            { id: user.idUser, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Guardar el token en la cookie httpOnly
        res.cookie("token", token, COOKIE_OPTIONS);

        return res.status(200).json({
            message: "Login exitoso.",
            user: { id: user.idUser, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error("Error en login:", err);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
}

/**
 * POST /auth/logout
 * Elimina la cookie del token.
 */
function logout(req, res) {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json({ message: "Sesión cerrada correctamente." });
}

/**
 * GET /auth/me
 * Devuelve los datos del usuario autenticado (requiere middleware requireAuth).
 */
function me(req, res) {
    // req.user viene del middleware requireAuth
    return res.status(200).json({ user: req.user });
}
export { login, logout, me };