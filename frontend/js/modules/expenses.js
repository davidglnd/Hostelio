import axios from "axios";
import { clearExpenses } from "./stores/expensesStore";
export function initExpenses(){
    console.log("Expenses module loaded");
// TO DO : Normalizar los gastos y proveedores para que se guarden bien en base de datos independientemente de las mayúsculas y los espacios en blanco
// ademas de empezar a dar de alta proveedores y asi ligar los gastos a los proveedores.
    setupDate();
    setupEvents();
}

function setupEvents(){
    const form = document.querySelector("form");

    if(!form) return;

    form.addEventListener("submit", handleSubmit);
}

async function handleSubmit(e){
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = {
        supplier: formData.get("supplier"),
        amount: formData.get("amount"),
        date: formData.get("date"),
        concept: formData.get("concept"),
        description: formData.get("description"),
    }

    const error = validateExpense(data);

    if(error) return console.error(error);

    try{
        const result = await axios.post("/api/expenses", data);
        clearExpenses();
        renderResult(result);
        setTimeout(() => location.reload(), 2000);
    }catch(error){
        handleError(error);
    }
}

function validateExpense(data){
    if(!data.supplier || !data.amount || !data.date || !data.concept) return "Rellena los campos obligatorios";
    return null;
}

function setupDate() {
    const input = document.querySelector("input[type=date]");
    if(!input) return;
    input.valueAsDate = new Date();
}

function handleError(error){
    console.log(error);
    if(error.response){
        console.error(error.response.data.message);
    }else{
        alert("Error de conexión");
    }
}

function renderResult(result){
    console.log(result);
    const resultContainer = document.querySelector(".result-container");
    resultContainer.textContent = "Gasto creado con exito";
    setTimeout(() => resultContainer.textContent = "", 2000);

}