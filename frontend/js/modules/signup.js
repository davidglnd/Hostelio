export function initSignup() {
    console.log("Signup module loaded");

    setupEvents();
}

function setupEvents(){
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
    });
}