import axios from "axios";
import { logout } from "./auth/logout.js";
import { firstLetterUpperCase } from "../utils/strings.js";
//TO DO: Refactor, Actualizar el banner del perfil despues de cambiar algo
//TO DO: colorcitos a los mensajes de error y confirmacion
export async function initProfile() {
    console.log("Profile module loaded");
    const profileData = await getProfile();
    renderProfile(profileData);
    setupEvents(profileData);
}

async function getProfile() {
    const profileData = await axios.get(`/api/auth/me`);
    return profileData.data;
}

function renderProfile(profileData) {
    const profile = document.querySelector(".profile-card");
    
    profile.querySelector("#profileName").textContent = firstLetterUpperCase(profileData.user.name) + " " + firstLetterUpperCase(profileData.user.lastName);
    profile.querySelector("#profileEmail").textContent = profileData.user.email;
    profile.querySelector("#profileBusiness").textContent = firstLetterUpperCase(profileData.user.businessName);
}

function setupEvents(profileData) {
    document.querySelector("#btnCancel").addEventListener("click", resetForm);
    document.querySelector("#profileForm").addEventListener("submit", (event) => handleSubmit(event, profileData));
    document.querySelector("#btnDelete").addEventListener("click", handleDelete);
    document.querySelector("#btnDeleteData").addEventListener("click", handleDeleteData);
}

function resetForm() {
    document.querySelector("form").reset();
}

function handleSubmit(e, profileData) {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        businessName: formData.get("businessName"),
        email: formData.get("email"),
        password: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    }

    updateProfile(data, profileData.user._id);
}
async function updateProfile(data, id){
    const changes = {};
    for (const [key, value] of Object.entries(data)) {
        if(value !== "" && value !== null && value !== undefined){ 
            changes[key] = value;
        }
    }
    if(changes.newPassword){
        if(changes.newPassword !== changes.confirmPassword) return renderResult("No coincide la contraseña nueva con la antigua.");
    }
    const payload = {id, changes};
    try{
        await axios.patch(`/api/user/me`, payload);
    }catch(error){
        renderResult(error.response.data.message);
        return;
    }
    
    renderResult();
}

function renderResult(msg) {
    const resultContainer = document.querySelector(".form-notice");
    if(msg){
        resultContainer.textContent = msg
        setTimeout(() => {
            resultContainer.textContent = ""
            
        }, 5000);
        return;
    }
    resultContainer.textContent = "Perfil actualizado con exito los cambios se veran reflejados en la siguiente sesión.";
    setTimeout(() => {
        resultContainer.textContent = ""
        resetForm();
    }, 5000);
}

async function handleDelete() {
    const result = confirm("¿Estas seguro de querer eliminar tu cuenta? Esto no se puede deshacer.");
    if(result){
        try{
            await Promise.all([
                axios.delete(`/api/user/me`),
                axios.delete(`/api/expenses`)
            ])
            logout();
        }catch(error){
            console.log(error);
        }
    }
}

async function handleDeleteData() {
    const result = confirm("¿Estas seguro de querer eliminar todos tus gastos? Esto no se puede deshacer.");
    if(result){
        try{
            await axios.delete(`/api/expenses`);
        }catch(error){
            console.log(error);
        }
    }
}
