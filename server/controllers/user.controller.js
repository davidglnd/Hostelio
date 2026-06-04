import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function updateProfile(req, res) {
    const changes = filterEmptyValues(req.body.changes);

    const error = await validatePassword(req.body.changes.password,req.body.id);
    if(error){
        return res.status(400).json({ message: error });
    }

    try{
        const result = await User.findByIdAndUpdate({ _id: req.body.id}, changes, { new: true, runValidators: true });
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error al actualizar el perfil." });
    }
    
    
}
export async function deleteProfile(req, res) {
    try{
        const result = await User.findByIdAndDelete({ _id: req.user._id });
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error al eliminar el perfil." });
    }
}
function filterEmptyValues(obj) {
    const changes = {};

    for(const [key, value] of Object.entries(obj)){
        if(value !== "" && value !== null && value !== undefined){
            changes[key] = value;
        }
    }

    return changes;
}

async function validatePassword(password,id){
    const user = await User.findById(id);
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return "Contraseña actual incorrecta.";
    }
}