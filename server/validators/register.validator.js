import { body } from "express-validator";

export const registerValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("lastName")
        .notEmpty()
        .withMessage("El apellido es obligatorio"),

    body("email")
        .isEmail()
        .withMessage("Formato de correo no valido"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("businessName")
        .notEmpty()
        .withMessage("El nombre del negocio es obligatorio"),
];  