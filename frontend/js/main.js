import {initExpenses} from "./modules/expenses.js";
import {initLogin} from "./modules/auth/login.js";
import {initSignup} from "./modules/auth/signup.js";

//components 
import "./components/buttons/logout-button.js";
import "./components/sidebar-nav.js";

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
    }
});