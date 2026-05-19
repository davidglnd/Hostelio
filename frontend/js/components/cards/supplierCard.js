import { LitElement, html, css } from "lit";

export class SupplierCard extends LitElement {
    static properties = {
        name: { type: String },
        totalAmount: { type: Number },
        lastAmount: { type: Number },
    }
    constructor() {
        super();
    }
    static styles = css`
        :host {
            display: block;
        }

        .card {
            background: var(--color-surface);
            border: var(--border-width) solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            box-shadow: var(--shadow-sm);
        }

    `
    render() {
        return html`
            <article class="card">
                <span class="card-supplier">${this.name}</span>
                <span class="card-amount">${this.totalAmount}€</span>
                <!-- <span class="card-amount">${this.lastAmount}€</span> -->
            </article>
        `;
    }    
}

customElements.define("supplier-card", SupplierCard);