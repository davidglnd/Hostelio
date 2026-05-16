import axios from "axios";
import { firstLetterUpperCase } from "../../utils/strings.js";

export function summaryView (expenses){
    console.log("Summary view loaded");
    initView(expenses);
}

async function initView(expenses){
    const main = document.querySelector("main");
    main.innerHTML = "";

    await renderHeader(expenses);
    renderButton(expenses);
}
    

async function renderHeader(expenses){
    const date = new Date();
    const user = await axios.get("/api/auth/me");

    const main = document.querySelector("main");
    const header = document.createElement("main-header");

    header.title = `Bienvenido `+ firstLetterUpperCase(user.data.user.name);
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    main.appendChild(header);
}

/**
 * Render the button to add expenses
 * Temporal solo para mejorar usabilidad de la prueba de la pagina para usuarios
 */
function renderButton(){
    const main = document.querySelector("main");
    const button = document.createElement("button");
    button.textContent = "Añadir gastos";
    main.appendChild(button);

    button.addEventListener("click", () => window.location.href = "/pages/expenses.html");
}