import { firstLetterUpperCase } from "../../utils/strings.js";
export function monthlyView (expenses){
    console.log("Monthly view loaded");

    initView(expenses);
}
function calculeStats(expenses){
    const month = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();
    
    if(expenses.length === 0 ) return currentMonth(month, null , 0) ;

    const expensesLastMonth = expenses.filter( expense => new Date(expense.date).getMonth() + 1 === lastMonth ).reduce((acc, expense) => acc + expense.amount, 0);
    const totalExpenses = expenses.filter( expense => new Date(expense.date).getMonth() + 1 === month ).reduce((acc, expense) => acc + expense.amount, 0);
    const porcentualDifference = expensesLastMonth > 0 ? Math.round((totalExpenses - expensesLastMonth) / expensesLastMonth * 100): totalExpenses;    
    const supplierThisMonth = expenses.filter(expense => new Date(expense.date).getMonth() + 1 === month ).map(expense => [expense.supplier, expense.amount]);

    const maxExpenseSupplier = supplierThisMonth.reduce((acc, [supplier, amount]) => {
        acc[supplier] 
            ? acc[supplier] += amount 
            : acc[supplier] = amount 
        return acc
    }, {});

    const monthlyExpenses = expenses.filter(expense => new Date(expense.date).getMonth() + 1 === month);

    currentMonth(month, porcentualDifference, totalExpenses)
    mostFrequentSupplier(maxExpenseSupplier);
    renderTableExpenses(monthlyExpenses);
}
function currentMonth(month, porcentualDifference, totalExpenses){
    const trend = porcentualDifference > 0 ? "up" : porcentualDifference < 0 ? "down" : "flat";
    const trendMessages = {
        up: `${porcentualDifference}% mas que el mes anterior`,
        down: `${porcentualDifference}% menos que el mes anterior`,
        flat: "Igual que el mes anterior"
    };

    const stats =   {
        label: "Total este mes",
        title: totalExpenses + " €",
        info: porcentualDifference === null ? "" : trendMessages[trend],
        trend: trend
    }

    renderStats(stats);
}
function mostFrequentSupplier(maxExpenseSupplier){
    const sorted = Object.entries(maxExpenseSupplier).sort((a, b) => b[1] - a[1]);

    const stats =   {
        label: "Proveedor mas frecuente",
        title: sorted[0][0],
        info: sorted[0][1] + " € este mes", 
    }
    renderStats(stats);
}
function renderHeader(){
    const date = new Date();

    const main = document.querySelector("main");
    const header = document.createElement("main-header");
    const button = document.createElement("button");

    header.title = "Estadisticas mensuales";
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    button.textContent = "Añadir gasto";
    
    main.appendChild(header);
    header.appendChild(button);

    button.addEventListener("click", () => window.location.href = "/pages/expenses.html");
}
function renderStats(stats){
    const divStatsCards = document.querySelector(".stats-cards");
    const statsCard = document.createElement("stats-card");
    
    statsCard.label = stats.label;
    statsCard.title = stats.title;
    statsCard.info = stats.info;
    statsCard.trend = stats.trend || "";

    divStatsCards.appendChild(statsCard);
}

function initView(expenses){
    const main = document.querySelector("main");
    main.innerHTML = "";

    renderHeader();

    main.appendChild(createStatsContainer());

    calculeStats(expenses);
}
function renderTableExpenses(expenses){
    const main = document.querySelector("main");
    const table = document.createElement("table-expenses");
    table.expenses = expenses;
    main.appendChild(table);
}
function createStatsContainer(){
    const div = document.createElement("div");
    div.className = "stats-cards";
    return div;
}