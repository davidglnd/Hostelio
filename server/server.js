import express from 'express';
import path from 'path';
import { connectToDB } from './db.js';
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(cookieParser());

// 3. Archivos estáticos
app.use(express.static(frontendPath));

// 4. Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use('/api/auth', authRoutes);

// 5. 404
app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: frontendPath });
});

connectToDB();

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});