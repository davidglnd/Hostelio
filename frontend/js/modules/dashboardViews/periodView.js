import { firstLetterUpperCase } from "../../utils/strings.js";
export function periodView(expenses) {
    initView(expenses);
}

// ── Init ──────────────────────────────────────────────────────
function initView(expenses) {
    const main = document.querySelector("main");
    main.innerHTML = "";

    renderHeader();
    renderFilterBar(expenses, main);

}
// ── Handlers ─────────────────────────────────────────────────
function handleMonthFilter(e, expenses) {
    e.preventDefault();

    const month = Number(e.target.elements.month.value);
    const year = Number(e.target.elements.year.value);

    const filteredExpenses = getExpensesByMonthAndYear(expenses, month, year);

    console.log(filteredExpenses);

    //renderFilteredExpenses(filteredExpenses, main);

}
// ── Calculations ─────────────────────────────────────────────────
function getYearsWithExpenses(expenses) {
    const yearsWithExpenses = new Set();
    expenses.forEach(expense => yearsWithExpenses.add(new Date(expense.date).getFullYear()));
    return Array.from(yearsWithExpenses);
}
function getExpensesByMonthAndYear(expenses, month, year) {
    const filteredExpenses = [];
    expenses.forEach(expense => {
        if (new Date(expense.date).getMonth() + 1 === month && new Date(expense.date).getFullYear() === year) {
            filteredExpenses.push(expense);
        };
    })

    return filteredExpenses;
}
// ── Render ──────────────────────────────────────────────────────
function renderHeader() {
    const date = new Date();
    const main = document.querySelector("main");
    const header = document.createElement("main-header");

    header.title = "Filtrar por periodo";
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    main.appendChild(header);
}

function renderFilterBar(expenses, main) {

    const divFilterBar = document.createElement("div");
    divFilterBar.classList.add("filter-bar");

    renderFilterBarOptions(divFilterBar, expenses);

    main.appendChild(divFilterBar, main);
}

function renderFilterBarOptions(divFilterBar, expenses, main) {

    const filterBarByMonthForm = document.createElement("form");
    filterBarByMonthForm.classList.add("filter-bar-by-month-form");

    const selectMonth = document.createElement("select");
    selectMonth.name = "month";
    selectMonth.id = "month";

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = firstLetterUpperCase(new Date(0, i - 1).toLocaleString("es-ES", { month: "long" }));
        selectMonth.appendChild(option);
    }

    const selectYear = document.createElement("select");
    selectYear.name = "year";
    selectYear.id = "year";
    const yearsWithExpenses = getYearsWithExpenses(expenses);

    const yearsWithExpensesSorted = yearsWithExpenses.sort((a, b) => b - a);

    yearsWithExpensesSorted.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        selectYear.appendChild(option);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Filtrar";

    filterBarByMonthForm.addEventListener("submit", (e) => handleMonthFilter(e, expenses, main));

    divFilterBar.appendChild(filterBarByMonthForm);
    filterBarByMonthForm.appendChild(selectMonth);
    filterBarByMonthForm.appendChild(selectYear);
    filterBarByMonthForm.appendChild(button);
}

function renderFilteredExpenses(filteredExpenses, main) {

}