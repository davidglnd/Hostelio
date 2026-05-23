import { sideNavSupplierItems } from "./config/supplierConfig.js";
import { getExpenses } from "./stores/expensesStore.js";
import { supplierByMonthView } from "./supplierViews/supplierByMonthView.js";
export function initSupplier() {
    console.log("Supplier module loaded");

    customElements.whenDefined("sidebar-nav").then(async () => {
        await initSetup();
    });
}
async function initSetup() {
    const expenses = await getExpenses();
    const supplierChoosen = sessionStorage.getItem("supplier");
    const savedView = sessionStorage.getItem("activeViewSupplier") || "expensesByMonth";
  
    document.title = `Hostelio - ${supplierChoosen}`;

    setupSidebar(expenses, savedView);
    handleViewChange(savedView, expenses);
}
function setupSidebar(expenses, savedView) {
    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.items = sideNavSupplierItems;
    sidebarNav.activeItem = savedView

    sidebarNav.addEventListener("sidebar-item-clicked", (e) => {
        sessionStorage.setItem("activeViewDashboard", e.detail);
        handleViewChange(e.detail, expenses);
    });
}

function handleViewChange(view, expenses) {
    switch (view) {
        case "expensesByMonth":
            supplierByMonthView(expenses);
            break;
    }   
}