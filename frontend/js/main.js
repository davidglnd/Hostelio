import {initExpenses} from "./modules/expenses.js";
import {initLogin} from "./modules/login.js";
import {initSignup} from "./modules/signup.js";

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