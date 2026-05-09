import { summaryView } from "../modules/dashboardViews/summaryView.js";
import { monthlyView } from "../modules/dashboardViews/monthlyView.js";
import { getExpenses } from "./stores/expensesStore.js";

export function initDashboard() {
    customElements.whenDefined("sidebar-nav").then(async () => {
        await initSetup();
    });
}

async function initSetup() {
    const expenses = await getExpenses();
    const savedView = sessionStorage.getItem("activeView") || "summary";
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.activeItem = savedView;
    
    handleViewChange(savedView, expenses);

    sidebarNav.addEventListener("sidebar-item-clicked", (e) => {
        sessionStorage.setItem("activeView", e.detail);
        handleViewChange(e.detail, expenses);
    });
}

function loadInitialView() {
    const savedView = sessionStorage.getItem("activeView") || "summary";
    
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.activeItem = savedView;
    
    handleViewChange(savedView);
}

function handleViewChange(view, expenses) {
    switch (view) {
        case "summary":
            summaryView(expenses);
            break;
        case "monthly":
            monthlyView(expenses);
            break;
    }
}