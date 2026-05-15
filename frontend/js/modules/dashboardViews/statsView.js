import { firstLetterUpperCase } from "../../utils/strings.js";
import Chart from 'chart.js/auto';
export function statsView (expenses){
    console.log("Stats view loaded");

    initView(expenses);
}
function initView(expenses){
    const main = document.querySelector("main");
    main.innerHTML = "";

    renderHeader(expenses);

    main.appendChild(createContainer());

    initExpensesChart(expenses);
}

function renderHeader(expenses){
    const date = new Date();

    const main = document.querySelector("main");
    const header = document.createElement("main-header");

    header.title = "Estadisticas";
    header.subtitle = `${firstLetterUpperCase(date.toLocaleString('default', { weekday: 'long' }))} ${date.toLocaleString('default', { day: 'numeric' })} de ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    main.appendChild(header);
}

function createContainer(){
    const container = document.createElement("div");
    container.classList.add("chart-container");
    return container;
}

function initExpensesChart(expenses){
    const chartContainer = document.querySelector(".chart-container");

    const canvas = document.createElement("canvas");
    canvas.id = "expenses-chart";

    chartContainer.appendChild(canvas);

    const { labels, values } = groupByMonth(expenses);

    new Chart(canvas,{
        type:"bar",
        data: {
            labels,
            datasets:[{
                label: "Gastos",
                data: values,
                backgroundColor: "#EDB89F",
                borderColor: "#D97040",
                hoverBackgroundColor: "#fc8249",
                borderWidth: 1,
                borderRadius: 6
            }],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => context.formattedValue + " €"
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + " €",
                    },
                },
            },
        }

    })

}

function groupByMonth(expenses){
    const map = {};
    // TO DO : GROUP BY MONTH THIS YEAR
    for(const expense of expenses){
        const key =  expense.date.slice(0, 7);
        map[key] = (map[key] || 0) + expense.amount;
    }

    const sorted = Object.keys(map).sort();

    const labels = sorted.map((key) => {
        const [year, month] = key.split("-");
        return new Date(year, month - 1).toLocaleString("es-ES", {
            month: "short",
            year: "numeric",
        });
    });

    const values = sorted.map((key) => map[key]);

    return { labels, values };
}