import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("El usuario es obligatorio"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];
