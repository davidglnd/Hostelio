import { LitElement, html, css } from "lit";

export class AppHeader extends LitElement {
    static properties = {
        currentPath: { type: String },
        scrolled: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: block;
            position: sticky;
            top: 0;
            z-index: var(--z-overlay);
        }
 
        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 var(--space-8);
            height: var(--header-height);
            background: var(--color-surface);
            border-bottom: var(--border-width) solid var(--color-border);
        }
 
        /* ── Brand ── */
        .header-brand {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            text-decoration: none;
        }
 
        .logo-mark {
            width: 32px;
            height: 32px;
            border-radius: var(--radius-md);
            background: var(--color-accent-600);
            color: var(--color-neutral-0);
            font-family: var(--font-body);
            font-size: var(--text-base);
            font-weight: var(--font-bold);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
 
        .header-brand span {
            font-family: var(--font-heading);
            font-size: var(--text-base);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            letter-spacing: -0.01em;
        }
 
        /* ── Nav ── */
        .header-nav {
            display: flex;
            align-items: center;
            gap: var(--space-1);
        }
 
        .header-nav a {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            color: var(--color-text-secondary);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-full);
            border: var(--border-width) solid transparent;
            text-decoration: none;
            transition: color var(--transition-fast),
                        border-color var(--transition-fast);
        }
 
        .header-nav a:hover {
            color: var(--color-text-primary);
            border-color: var(--color-border);
        }
 
        .header-nav a.active {
            color: var(--color-text-primary);
            border-color: var(--color-border-strong);
        }
 
        /* ── Right ── */
        .header-right {
            display: flex;
            align-items: center;
            gap: var(--space-3);
        }
 
        .header-right a {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            color: var(--color-text-secondary);
            text-decoration: none;
            transition: color var(--transition-fast);
        }
 
        .header-right a:hover {
            color: var(--color-text-primary);
        }
 
        /* ── Responsive ── */
        @media (max-width: 640px) {
            header {
                padding: 0 var(--space-4);
            }
 
            .header-nav {
                display: none;
            }
        }
    `;


    constructor() {
        super();
        this.currentPath = document.body.dataset.page;
    }

    _isActive(href) {
        return href === this.currentPath ? "active" : "";
    }

    render() {
        return html`
            <header>
                <div class="header-brand">
                    <div class="logo-mark">H</div>
                    <span>Hostelio</span>
                </div>

                <nav class="header-nav">
                    <a href="/pages/dashboard" class="${this._isActive("dashboard")}">Inicio</a>
                    <a href="/pages/expenses"  class="${this._isActive("expenses")}">Gastos</a>
                </nav>

                <div class="header-right">
                    <a href="/pages/profile">Perfil</a>
                </div>
            </header>
        `;
    }
}

customElements.define("app-header", AppHeader);