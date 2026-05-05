import axios from "axios";
export function initExpenses(){
    console.log("Expenses module loaded");

    setupDate();
    setupEvents();
}

function setupEvents(){
    const form = document.querySelector("form");

    if(!form) return;

    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(e){
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
        const result = axios.post("/api/expenses", data);
        console.log(result);
        //window.location.href = "/pages/expenses.html";
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