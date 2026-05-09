import { LitElement, html, css } from "lit";

export class ExpensesCard extends LitElement {
    static properties = {
        supplier: { type: String },
        amount: { type: String },
        concept: { type: String },
        date: { type: String },
        description: { type: String },
    }
    constructor() {
        super();
        this.supplier = '';
        this.amount = '';
        this.concept = '';
        this.date = '';
        this.description = '';
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
            transition: box-shadow var(--transition-fast);
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        .card:hover {
            box-shadow: var(--shadow-md);
        }

        .card__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .card__supplier {
            font-family: var(--font-heading);
            font-size: var(--text-md);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            line-height: var(--leading-tight);
        }

        .card__amount {
            font-family: var(--font-heading);
            font-size: var(--text-lg);
            font-weight: var(--font-bold);
            color: var(--color-accent-600);
            line-height: 1;
        }

        .card__concept {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            color: var(--color-text-secondary);
        }

        .card__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: var(--space-3);
            border-top: var(--border-width) solid var(--color-border-subtle);
        }

        .card__date {
            font-family: var(--font-body);
            font-size: var(--text-xs);
            font-weight: var(--font-semibold);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--color-text-muted);
        }

        .card__description {
            font-family: var(--font-body);
            font-size: var(--text-xs);
            color: var(--color-text-muted);
            font-style: italic;
        }
    `
    render() {
        return html`
            <article class="card">
                <div class="card__header">
                    <span class="card__supplier">${this.supplier}</span>
                    <span class="card__amount">${this.amount}€</span>
                </div>

                <span class="card__concept">${this.concept}</span>

                <div class="card__footer">
                    <span class="card__date">${this.date}</span>
                    <span class="card__description">${this.description}</span>
                </div>
            </article>
        `;
    }    
}

customElements.define("expenses-card", ExpensesCard);