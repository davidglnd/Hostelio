import axios from "axios";
export function initSignup() {
    console.log("Signup module loaded");
    setupEvents();
}

function setupEvents(){
    const form = document.querySelector("form");
    if(!form) return;
    document.querySelector("form").addEventListener("submit", handleSubmit);
}
async function handleSubmit(e){
    const data = getFormData(e);
    const error = validateFormData(data);

    if(error) return console.error(error);// TO DO : renderError()

    await registerUser(data);

}
function getFormData(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
        firstName: formData.get("name"),
        lastName: formData.get("lastName"),
        businessName: formData.get("businessName"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    return data;
}

function validateFormData(data) {
    if (!data.firstName || !data.email || !data.password) 
        return "Todos los campos son obligatorios";

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(data.email)) 
    //     return "El email no tiene un formato válido";

    // if (data.password.length < 8) 
    //     return "La contraseña debe tener al menos 8 caracteres";

    return null;
}

async function registerUser(data) {
    axios.post("/api/auth/register", data).then(response => {
        console.log("response");
        //window.location.href = "/pages/dashboard.html";
    }).catch(error => {
        console.error("this",error);
    });
}