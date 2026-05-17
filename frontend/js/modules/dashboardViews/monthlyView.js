import { firstLetterUpperCase } from "../../utils/strings.js";

export function monthlyView(expenses) {
    initView(expenses);
}

// ── Init ──────────────────────────────────────────────────────
function initView(expenses) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    renderHeader();
    main.appendChild(createStatsContainer());
    initMonthlyStats(expenses);
}

// ── Stats ─────────────────────────────────────────────────────
function initMonthlyStats(expenses) {
    const month = new Date().getMonth() + 1;

    if (expenses.length === 0) return currentMonth(null, 0);

    const monthlyExpenses = getExpensesByMonth(expenses, month);
    const lastMonthExpenses = getExpensesByMonth(expenses, month - 1);

    const totalThisMonth = calculateTotal(monthlyExpenses);
    const totalLastMonth = calculateTotal(lastMonthExpenses);

    const percentualDifference = totalLastMonth > 0
        ? Math.round((totalThisMonth - totalLastMonth) / totalLastMonth * 100)
        : null;

    const expensesBySupplier = groupExpensesBySupplier(monthlyExpenses);

    currentMonth(percentualDifference, totalThisMonth);
    mostFrequentSupplier(expensesBySupplier);
    renderTableExpenses(monthlyExpenses);
}

// ── Helpers de cálculo ────────────────────────────────────────
function getExpensesByMonth(expenses, month) {
    return expenses.filter(expense => new Date(expense.date).getMonth() + 1 === month);
}

function calculateTotal(expenses) {
    return parseFloat(expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2));
}

function groupExpensesBySupplier(expenses) {
    return expenses.reduce((acc, expense) => {
        acc[expense.supplier] = parseFloat(((acc[expense.supplier] ?? 0) + expense.amount).toFixed(2));
        return acc;
    }, {});
}

// ── Render ────────────────────────────────────────────────────
function currentMonth(percentualDifference, totalExpenses) {
    const trend = percentualDifference > 0 ? "up" : percentualDifference < 0 ? "down" : "flat";
    const trendMessages = {
        up: `${percentualDifference}% mas que el mes anterior`,
        down: `${percentualDifference}% menos que el mes anterior`,
        flat: "Igual que el mes anterior"
    };

    renderStats({
        label: "Total este mes",
        title: totalExpenses + " €",
        info: percentualDifference === null ? "" : trendMessages[trend],
        trend
    });
}

function mostFrequentSupplier(expensesBySupplier) {
    const sorted = Object.entries(expensesBySupplier).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return;

    renderStats({
        label: "Proveedor con más gasto",
        title: sorted[0][0],
        info: sorted[0][1] + " € este mes"
    });
}

function renderHeader() {
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

function renderStats(stats) {
    const statsCard = document.createElement("stats-card");
    statsCard.label = stats.label;
    statsCard.title = stats.title;
    statsCard.info = stats.info;
    statsCard.trend = stats.trend || "";
    document.querySelector(".stats-cards").appendChild(statsCard);
}

function renderTableExpenses(expenses) {
    const table = document.createElement("table-expenses");
    table.expenses = expenses;
    document.querySelector("main").appendChild(table);
}

function createStatsContainer() {
    const div = document.createElement("div");
    div.className = "stats-cards";
    return div;
}