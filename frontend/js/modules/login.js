export function initLogin() {
    console.log("Login module loaded");

    setupEvents();
}

function setupEvents() {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        };

    });
}