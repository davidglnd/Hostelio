import { summaryView } from "../modules/dashboardViews/summaryView.js";
import { monthlyView } from "../modules/dashboardViews/monthlyView.js";
import { getExpenses } from "./stores/expensesStore.js";

export function initDashboard() {
    customElements.whenDefined("sidebar-nav").then(() => {
        initSetup();
        loadInitialView();
        getExpenses();
    });
}

function initSetup() {
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.addEventListener("sidebar-item-clicked", (e) => {
        sessionStorage.setItem("activeView", e.detail);
        handleViewChange(e.detail);
    });
}

function loadInitialView() {
    const savedView = sessionStorage.getItem("activeView") || "summary";
    
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.activeItem = savedView;
    
    handleViewChange(savedView);
}

function handleViewChange(view) {
    switch (view) {
        case "summary":
            summaryView();
            break;
        case "monthly":
            monthlyView();
            break;
    }
}