import { firstLetterUpperCase } from "../utils/strings.js";
import { sideNavSupplierItems } from "./config/supplierConfig.js";
export function initSupplier() {
    console.log("Supplier module loaded");

    customElements.whenDefined("sidebar-nav").then(async () => {
        await initSetup();
    });
}
// ── Init ──────────────────────────────────────────────────────
async function initSetup() {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const sidebarNav = document.querySelector("sidebar-nav");
    sidebarNav.items = sideNavSupplierItems;

    const supplierChoosen = sessionStorage.getItem("supplier");
  
    document.title = `Hostelio - ${supplierChoosen}`;

    renderHeader(main, supplierChoosen);

    renderMenu(main);
    
}
// ── Render ────────────────────────────────────────────────────
function renderHeader(main, supplierChoosen) {
    const date = new Date();

    const header = document.createElement("main-header");

    header.title = supplierChoosen;

    main.appendChild(header);
}

function renderMenu(main) {
    const config = {
        element: "div",
        class: "menu-list-supplier",
        items: [
            { label: "Gastos ultimo mes", id: "last-month" },
            { label: "Gastos este mes",   id: "this-month" }
        ]
    };

    const menu = document.createElement(config.element);
    menu.classList.add(config.class);

    config.items.forEach(({ label, id }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.id = id;
        button.addEventListener("click", () => {
            const buttons = document.querySelectorAll(".menu-list-supplier button");
            buttons.forEach(button => button.classList.remove("active"));
            button.classList.add("active")
        });
        menu.appendChild(button);
    });

    main.appendChild(menu);
}