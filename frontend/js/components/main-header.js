import { LitElement, html, css } from "lit";

export class MainHeader extends LitElement {
    static properties = {
        title: { type: String },
        subtitle: { type: String },
    };

    constructor() {
        super();
        this.title = "";
        this.subtitle = "";
    }

    static styles = css`
        :host {
            display: block;
        }

        .body-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: var(--space-3) var(--space-2);
            border-bottom: var(--border-width) solid var(--color-border);
        }

        .header-text h2 {
            font-family: var(--font-heading);
            font-size: var(--text-2xl);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            line-height: var(--leading-tight);
            margin: 0;
        }

        .header-text p {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            color: var(--color-text-muted);
            margin-top: var(--space-1);
            margin-bottom: 0;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: var(--space-3);
        }
    `;

    render() {
        return html`
            <div class="body-header">
                <div class="header-text">
                    <h2>${this.title}</h2>
                    <p>${this.subtitle}</p>
                </div>
                <div class="header-actions">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define("main-header", MainHeader);