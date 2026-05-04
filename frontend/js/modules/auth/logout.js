import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

export function logout() {
    axios.post("/api/auth/logout").then(() =>{
        window.location.href = "/";
    })
}