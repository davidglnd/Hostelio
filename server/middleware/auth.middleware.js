import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "cambia_esto_por_un_secreto_seguro";

/**
 * Middleware que verifica el JWT de la cookie.
 * Úsalo en las rutas que requieren autenticación.
 */
export function requireAuth(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "No autenticado. Token no encontrado." });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload; // { id, email, iat, exp }
      next();
    } catch (err) {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
}
