//import express 
import express from 'express';
import path from 'path';
//import connectToDB
import { connectToDB } from './db.js';

import { fileURLToPath } from 'url';

import cors from "cors";
//import validators
import { loginValidator } from './validators/login.validator.js';
//import controllers
import { login } from './controllers/login.controller.js';
const app = express();
const PORT = process.env.PORT || 3000;

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../frontend');

// 1. Logger
app.use((req, res, next) => {
    console.log("➡️", req.method, req.url);
    next();
});

// 2. Middlewares globales
app.use(cors());
app.use(express.json());

// 3. Archivos estáticos (antes de las rutas y del 404)
app.use(express.static(frontendPath));

// 4. Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/api/login', loginValidator, login );
// app.post('/api/login', (req, res) => {
//     console.log(req.body);
// });
// 5. 404 al final de todo
app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: frontendPath });
});

// Conectar y arrancar
connectToDB();
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});