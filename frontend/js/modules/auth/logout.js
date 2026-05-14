import axios from "axios";

export function logout() {
    axios.post("/api/auth/logout").then(() =>{
        window.location.href = "/";
    })
}