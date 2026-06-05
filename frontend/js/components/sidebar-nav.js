import { LitElement, html, css } from "lit";

export class SidebarNav extends LitElement {
    static properties = {
        activeItem: { type: String },
        items: { type: Array },
    }
    constructor() {
        super();
        this.activeItem = sessionStorage.getItem("activeView") || "";
        this.items = [];
    }
    static styles = css `    
        aside {
            grid-area: sidebar;
            background: var(--color-surface);
            border-right: 1px solid var(--color-border);
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            position: sticky;
            top: var(--header-height);
            height: calc(100vh - var(--header-height));
            overflow-y: auto;
        }
        
        aside>span{
            font-size: var(--text-sm);
            color: var(--color-text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: var(--font-medium);
            margin-bottom: 2px;
        }
        
        li {
            text-decoration: none;
            font-size: var(--text-base);
            color: var(--color-text-primary);
            display: flex;
            align-items: center;
            gap: 10px;
            padding-top: 6px;
            padding-bottom: 6px;
            padding-left: 12px;
            padding-right: 4px;
            border-radius: var(--radius-md);
            border:var(--border-width) solid transparent;
            cursor: pointer;
        }
        li.active {
            background: var(--color-sidebar-active-bg);
            color: var(--color-sidebar-active-text);
            border:var(--border-width) solid var(--color-accent-400);
            border-radius: var(--radius-md);
        }
        li:hover {
            background: var(--color-sidebar-active-bg);
            color: var(--color-sidebar-active-text);
        }
    `
    render() {
        return html`
            <aside>
                ${this.items.map((item) => html`
                    <span>${item.label}</span>
                    ${
                        item.keys.map((key, index) => html `
                            <li class="${this._isActive(key)}" @click="${(e) => this._handleClick(e, key)}">
                                ${item.labelKey[index]}
                            </li>       
                        `)
                    }
                `)}
            </aside>
        `;
    }
    _isActive(item) {
        return this.activeItem === item ? "active" : "";
    }
    _handleClick(e, key){
        this.activeItem = key;
        this.dispatchEvent(new CustomEvent("sidebar-item-clicked", {
            detail: key,
            bubbles:true,
            composed:true,
            }
        ));
    }
}

customElements.define("sidebar-nav", SidebarNav);