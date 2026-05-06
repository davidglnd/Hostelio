import { LitElement, html, css } from "lit";

export class SidebarNav extends LitElement {
    static properties = {
        active: {type: String},
    };

    static styles = css`
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        li.active a {
            font-weight: bold;
        }
    `
    render() {
        const links = [
            {href: "/", label: "Dashboard", key: "dashboard"},
            {href: "/pages/expenses", label: "Gastos", key: "expenses"},
        ]
        return html`
            <ul>
                ${links.map(link => html`
                    <li class="${this.active === link.key ? "active" : ""}">
                        <a href="${link.href}">${link.label}</a>
                    </li>
                `)}
            </ul>
        `;
    }
}

customElements.define("sidebar-nav", SidebarNav);