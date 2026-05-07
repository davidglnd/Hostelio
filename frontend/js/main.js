import {initExpenses} from "./modules/expenses.js";
import {initLogin} from "./modules/auth/login.js";
import {initSignup} from "./modules/auth/signup.js";
import {initDashboard} from "./modules/dashboard.js";

//components 
import "./components/buttons/logout-button.js";
import "./components/sidebar-nav.js";
import "./components/app-header.js";

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;

    switch (page){
        case "expenses":
            initExpenses();
            break;
        case "login":
            initLogin();
            break;
        case "signup":
            initSignup();
            break;
        case "dashboard":
            initDashboard();
            break;
    }
});