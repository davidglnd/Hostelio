import { validationResult } from "express-validator";

import bcrypt from "bcrypt";

import User from "../models/User.js";

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Rellena ambos campos", code: "00" });
    }

    try{
        const { email, password } = req.body;
        
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
            user: { id: user.id, name: user.firstName },
        });

        res.status(200).json({
            message: "Login correcto",
            user: { id: user.id, name: user.firstName },
        });
    }catch(error){
        console.log(error);
    }
}