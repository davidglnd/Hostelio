import { summaryView } from "../modules/dashboardViews/summaryView.js";
import { monthlyView } from "../modules/dashboardViews/monthlyView.js";
import { statsView } from "../modules/dashboardViews/statsView.js";
import { supplierView } from "../modules/dashboardViews/supplierView.js";
import { getExpenses } from "./stores/expensesStore.js";
import { sideNavDashboardItems }  from "./config/dashboardConfig.js";

export function initDashboard() {
    customElements.whenDefined("sidebar-nav").then(async () => {
        await initSetup();
    });
}

async function initSetup() {
    const expenses = await getExpenses();
    const savedView = sessionStorage.getItem("activeViewDashboard") || "summary";
    setupSidebar(expenses, savedView);
    handleViewChange(savedView, expenses);
}

function setupSidebar(expenses, savedView) {
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.activeItem = savedView;
    sidebarNav.items = sideNavDashboardItems;

    sidebarNav.addEventListener("sidebar-item-clicked", (e) => {
        sessionStorage.setItem("activeViewDashboard", e.detail);
        handleViewChange(e.detail, expenses);
    });
}

function handleViewChange(view, expenses) {
    switch (view) {
        case "summary":
            summaryView(expenses);
            break;
        case "monthly":
            monthlyView(expenses);
            break;
        case "stats":
            statsView(expenses);
            break;
        case "supplier":
            supplierView(expenses);
            break;
    }
}

