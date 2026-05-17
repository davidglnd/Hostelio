import { firstLetterUpperCase } from "../../utils/strings.js";
export function supplierView(expenses){
    console.log("Supplier view loaded");

    initView(expenses);
}
// ── Init ──────────────────────────────────────────────────────
function initView(expenses){
    const main = document.querySelector("main");
    main.innerHTML = "";

    renderHeader();

    main.appendChild(createContainer());
    
    const suppliersExpenses = groupExpensesBySupplier(expenses);

    /*TO DO: Hacer algo en el caso de nuevo usuario y que no queremos renderizar la tabla de proveedores.*/

    renderSupplierTable(suppliersExpenses);
}
// ── Calculations ─────────────────────────────────────────────────────────
function getSupplier(expenses) {
    return expenses.reduce((acc, expense) => {
        if (acc.includes(expense.supplier)) return acc;
        acc.push(expense.supplier);
        return acc;
    },[]);/*SIN USO PERO NO BORRAR*/
}

function groupExpensesBySupplier(expenses) {
    return expenses.reduce((acc, expense) => {
        acc[expense.supplier] = parseFloat(((acc[expense.supplier] ?? 0) + expense.amount).toFixed(2));
        return acc;
    }, {});
}
// ── Render ────────────────────────────────────────────────────
function renderHeader(){
    const date = new Date();

    const main = document.querySelector("main");
    const header = document.createElement("main-header");
    const button = document.createElement("button");

    header.title = "Gasto por proveedor";
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    main.appendChild(header);
}

function renderSupplierTable(expensesBySupplier){
    
    const container = document.querySelector(".supplier-info");
    const table = document.createElement("table-supplier");
    table.expenses = expensesBySupplier;
    container.appendChild(table);

    table.addEventListener("supplier-clicked", (e) => {
        const supplier = e.detail;
        //window.location.href = `/pages/supplier.html?supplier=${supplier}`;
    });
}
function createContainer(){
    const div = document.createElement("div");
    div.className = "supplier-info";
    return div;
}
