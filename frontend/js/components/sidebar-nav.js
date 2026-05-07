import { LitElement, html, css } from "lit";

export class SidebarNav extends LitElement {
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
        
        a {
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
            transition: var(--transition-fast);
        }
        a.active {
            background: var(--color-sidebar-active-bg);
            color: var(--color-sidebar-active-text);
            border:var(--border-width) solid var(--color-border);
        }
        a:hover {
            background: var(--color-sidebar-active-bg);
            color: var(--color-sidebar-active-text);
        }
    `
    render() {
        return html`
            <aside>
                <span class="nav-section-label">General</span>
                <a class="nav-item active" href="#">
                    Resumen
                </a>
                <a class="nav-item" href="#">
                    Estadisticas
                </a>
                <span class="nav-section-label">Informes</span>
                <a class="nav-item" href="#">
                    Mensual
                </a>
                <a class="nav-item" href="#">
                    Semanal
                </a>
            </aside>
        `;
    }
}

customElements.define("sidebar-nav", SidebarNav);