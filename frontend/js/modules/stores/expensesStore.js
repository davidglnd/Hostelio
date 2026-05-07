import axios from "axios";

let expenses = null;

export async function getExpenses(){
    if(expenses) return expenses.data;

    console.log("Fetching expenses");
    expenses = await axios.get("/api/expenses");
    return expenses.data;
}

export async function clearExpenses() {
    expenses = null;
}