import { firstLetterUpperCase } from "../../utils/strings.js";
export function supplierView(expenses){
    console.log("Supplier view loaded");

    initView(expenses);
}

function initView(expenses){
    const main = document.querySelector("main");
    main.innerHTML = "";

    renderHeader();

    main.appendChild(createContainer());

    const expensesBySupplier = groupExpensesBySupplier(getExpensesThisMonth(expenses));

    
}

function renderHeader(){
    const date = new Date();

    const main = document.querySelector("main");
    const header = document.createElement("main-header");
    const button = document.createElement("button");

    header.title = "Gasto por proveedor";
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    main.appendChild(header);
}

function createContainer(){
    const div = document.createElement("div");
    div.className = "expenses-supplier";
    return div;
}

function getExpensesThisMonth(expenses) {
    const month = new Date().getMonth() + 1;
    return expenses.filter(expense => new Date(expense.date).getMonth() + 1 === month);
}

function groupExpensesBySupplier(expenses) {
    return expenses.reduce((acc, expense) => {
        acc[expense.supplier] = parseFloat(((acc[expense.supplier] ?? 0) + expense.amount).toFixed(2));
        return acc;
    }, {});
}