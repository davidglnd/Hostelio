export function monthlyView (expenses){
    console.log("Monthly view loaded");
    calculeStats(expenses);
}
function calculeStats(expenses){
    const month = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();
    
    if(expenses.length === 0 ) return currentMonth(month, null , 0) ;

    const expensesLastMonth = expenses.filter( expense => new Date(expense.date).getMonth() + 1 === lastMonth ).reduce((acc, expense) => acc + expense.amount, 0);
    const totalExpenses = expenses.filter( expense => new Date(expense.date).getMonth() + 1 === month ).reduce((acc, expense) => acc + expense.amount, 0);
    const porcentualDifference = expensesLastMonth > 0 ? Math.round((totalExpenses - expensesLastMonth) / expensesLastMonth * 100): null;    
    const supplier = expenses.map(expense => expense.supplier)

    const supplierCount = supplier.reduce((acc, supplier) => {
        acc[supplier] = (acc[supplier] || 0) + 1;
        return acc;
    }, {})

    const maxRepeat = Object.entries(supplierCount).reduce((max, current) => {
        return current[1] > max[1] ? current : max;
    })
    currentMonth(month, porcentualDifference, totalExpenses)
    mostFrequentSupplier(maxRepeat);

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

    render(stats);
}
function mostFrequentSupplier(maxRepeat){
    const stats =   {
        label: "Proveedor mas frecuente",
        title: maxRepeat[0],
        info: maxRepeat[1] + " veces"
    }
    render(stats);
}
function render(stats){
    const main = document.querySelector("main");
    const statsCard = document.createElement("stats-card");

    statsCard.label = stats.label;
    statsCard.title = stats.title;
    statsCard.info = stats.info;
    statsCard.trend = stats.trend || "";

    main.appendChild(statsCard);
}