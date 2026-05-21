import { firstLetterUpperCase } from "../utils/strings.js";
import { sideNavSupplierItems } from "./config/supplierConfig.js";
import { getExpenses } from "./stores/expensesStore.js";
import { formatDate } from "../utils/dataUtils.js";
export function initSupplier() {
    console.log("Supplier module loaded");

    customElements.whenDefined("sidebar-nav").then(async () => {
        await initSetup();
    });
}
// ── Init ──────────────────────────────────────────────────────
async function initSetup() {
    const expenses = await getExpenses();
    const main = document.querySelector("main");
    main.innerHTML = "";

    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.items = sideNavSupplierItems;

    const supplierChoosen = sessionStorage.getItem("supplier");
  
    document.title = `Hostelio - ${supplierChoosen}`;

    renderHeader(main, supplierChoosen);

    renderMenu(expenses, supplierChoosen, main);

    renderMain(expenses, supplierChoosen, main);
    
}
// ── Calculations ──────────────────────────────────────────────
function getExpensesBySupplier(expenses, supplier) {
    return expenses.filter(expense => expense.supplier === supplier);
}
function getExpensesBySupplierByMonth(activeTab, expensesBySupplier){
    const month = activeTab === "this-month" ? new Date().getMonth() + 1 : new Date().getMonth();

    return expensesBySupplier.filter(expense => new Date(expense.date).getMonth() + 1 === month);
}
// ── Render ────────────────────────────────────────────────────
function renderHeader(main, supplierChoosen) {
    const header = document.createElement("main-header");

    header.title = supplierChoosen;

    main.appendChild(header);
}

function renderMenu(expenses, supplier, main) {
    const config = {
        element: "div",
        class: "menu-list-supplier",
        items: [
            { label: "Gastos este mes", id: "this-month"},
            { label: "Gastos mes anterior",   id: "last-month" }
        ]
    };

    const menu = document.createElement(config.element);
    menu.classList.add(config.class);

    config.items.forEach(({ label, id }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.id = id;
        if (id === "this-month") {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            const buttons = document.querySelectorAll(".menu-list-supplier button");
            buttons.forEach(button => button.classList.remove("active"));
            button.classList.add("active");
            renderMain(expenses, supplier, main);
        });
        menu.appendChild(button);
    });

    main.appendChild(menu);
}
function renderMain(expenses, supplier, main) {
    const activeTab = document.querySelector(".menu-list-supplier button.active").id;
    const expensesBySupplier = getExpensesBySupplier(expenses, supplier);
    const expensesBySupplierByMonth = getExpensesBySupplierByMonth(activeTab, expensesBySupplier);
    
    renderTable(main, expensesBySupplierByMonth);
}
function renderTable(main, expensesBySupplierByMonth){
    const container = resetTableContainer(main);
    const tableExpenses = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `<tr><th>Fecha</th><th>Concepto</th><th>Importe</th><th></th></tr>`;
    tbody.innerHTML = expensesBySupplierByMonth.map(expense => 
                        `<tr><td>${formatDate(expense.date)}</td><td>${firstLetterUpperCase(expense.concept)}</td><td>${expense.amount}</td><td>Ver detalle</td></tr>`).join("");

    container.appendChild(tableExpenses);
    tableExpenses.appendChild(thead);
    tableExpenses.appendChild(tbody);
    
}
function resetTableContainer(main){
    if(main.querySelector(".table-container")) main.querySelector(".table-container").remove();
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");
    return main.appendChild(tableContainer);
}