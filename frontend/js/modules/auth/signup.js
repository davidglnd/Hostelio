import axios from "axios";
export function initSignup() {
    console.log("Signup module loaded");
    setupEvents();
}

function setupEvents(){
    document.querySelector("form")?.addEventListener("submit", handleSubmit);
}
async function handleSubmit(e){
    const data = getFormData(e);
    const error = validateFormData(data);

    if(error) return renderError(error);

    await registerUser(data);

}
function getFormData(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    return {
        firstName: formData.get("name"),
        lastName: formData.get("lastName"),
        businessName: formData.get("businessName"),
        email: formData.get("email"),
        password: formData.get("password")
    }
}

function validateFormData(data) {
    if (!data.firstName || !data.email || !data.password) 
        return "Todos los campos son obligatorios";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) 
        return "El email no tiene un formato válido";

    if (data.password.length < 8) 
        return "La contraseña debe tener al menos 8 caracteres";

    return null;
}

async function registerUser(data) {
    try{
        const response = await axios.post("/api/auth/register", data);
        window.location.href = "/pages/login.html";
    }catch(error){
        renderError(error.response.data.message);
    }
}

function renderError(error) {
    const errorElement = document.querySelector(".auth-error");
    errorElement.textContent = error;
    setTimeout(() => errorElement.textContent = "", 3000);
}