import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";
export function initLogin() {
    console.log("Login module loaded");

    setupEvents();
}


function setupEvents() {
    const form = document.querySelector("form");
    if(!form) return;

    form.addEventListener("submit", handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    
    const error = validateLogin(data);
    if(error) return console.error(error);
    
    try{
        const result = await loginUser(data);
        console.log(result);
        window.location.href = "/pages/expenses.html";
    }catch(error){
        handleError(error);
    }

}
function validateLogin(data){
    if(!data.email || !data.password) return "Todos los campos son obligatorios";
    return null;
}

async function loginUser(data) {
    const response = await axios.post(`/api/login`, data);
    return response.data;
}

function handleError(error){
    console.log(error)
    if(error.response){
        console.error(error.response.data.message || "Credenciales incorrectas");
    }else{
        alert("Error de conexión");
    }
}