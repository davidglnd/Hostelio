import { LitElement, html, css } from "lit";

export class SupplierCard extends LitElement {
    static properties = {
    }
    constructor() {
        super();
    }
    render() {
        return html`
            <article class="card">
                <div class="card-header">
                    <span class="card-supplier">${this.supplier}</span>
                    <span class="card-amount">${this.amount}€</span>
                </div>

                <span class="card-concept">${this.concept}</span>

                <div class="card-footer">
                    <span class="card-date">${this.date}</span>
                    <span class="card-description">${this.description}</span>
                </div>
            </article>
        `;
    }    
}

customElements.define("supplier-card", SupplierCard);