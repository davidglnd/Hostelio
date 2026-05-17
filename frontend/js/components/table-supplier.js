import { LitElement, html, css } from "lit";
import { formatDate } from "../utils/dataUtils";
export class tableSupplier extends LitElement {
    static properties = {
        expenses: { type: Array },
    };
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

        /* ── Table ── */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead th {
            font-family: var(--font-body);
            font-size: var(--text-xs);
            font-weight: var(--font-semibold);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--color-text-muted);
            text-align: left;
            padding: 0 var(--space-3) var(--space-3) 0;
            border-bottom: var(--border-width) solid var(--color-border);
        }

        tbody tr {
            border-bottom: var(--border-width) solid var(--color-border-subtle);
            transition: background var(--transition-fast);
        }

        tbody tr:last-child {
            border-bottom: none;
        }

        tbody tr:hover {
            background: var(--color-bg-sidebar);
        }

        tbody td {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            color: var(--color-text-primary);
            padding: var(--space-4) var(--space-3) var(--space-4) 0;
            vertical-align: middle;
        }

        tbody td.amount {
            font-weight: var(--font-medium);
            color: var(--color-accent-600);
        }
    `;
    render() {
        return html`
            <div class="card">
                <table>
                    <thead>
                        <tr>
                            <th>Proveedor</th>
                            <th>Importe historico</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>${this._handleExpenses(this.expenses, this.suppliers)}</tbody>
                </table>
            </div>
        `; 
    }

    _handleExpenses(expenses){
        return html`
            ${Object.entries(expenses).map((expense) => html`
                <tr>
                    <td>${expense[0]}</td>
                    <td class="amount">${expense[1]}</td>
                    <td @click=${() => this._handleClick(expense[0])}>Ver detalles de este proveedor</td>
                </tr>
            `)}
        `;       
    }

    _handleClick(supplier) {
        this.dispatchEvent(new CustomEvent("supplier-clicked", {
            detail: supplier,
            bubbles:true,
            composed:true,
            }
        ));        
    }


}

customElements.define("table-supplier", tableSupplier);
