import { formatDate } from "../../utils/dataUtils";
export function monthlyView (expenses){
    console.log("Monthly view loaded");
    
    renderExpenses(expenses);

}

function renderExpenses(expenses){
    const dashboardMain = document.querySelector("main");

    dashboardMain.innerHTML = "";

    expenses.forEach(expense => {
        const expenseCard = document.createElement("expenses-card");
        
        expenseCard.supplier = expense.supplier;
        expenseCard.amount = expense.amount;
        expenseCard.concept = expense.concept;
        expenseCard.date = formatDate(expense.date);
        expenseCard.description = expense.description;
        
        dashboardMain.appendChild(expenseCard);
    });
    

}