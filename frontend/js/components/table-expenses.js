import { LitElement, html, css } from "lit";
import { formatDate } from "../utils/dataUtils";
export class tableExpenses extends LitElement {
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

        /* ── Header ── */
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-5);
        }

        .card-header h2 {
            font-family: var(--font-heading);
            font-size: var(--text-md);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            line-height: var(--leading-tight);
        }

        .actions {
            display: flex;
            gap: var(--space-2);
        }

        .btn-ghost {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            color: var(--color-text-secondary);
            background: transparent;
            border: var(--border-width) solid var(--color-border);
            border-radius: var(--radius-md);
            padding: var(--space-2) var(--space-4);
            cursor: pointer;
            transition: border-color var(--transition-fast),
                        color var(--transition-fast);
        }

        .btn-ghost:hover {
            border-color: var(--color-border-strong);
            color: var(--color-text-primary);
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
                <div class="card-header">
                    <h2>Ultimos gastos registrados</h2>
                    <div class="actions">
                        <button class="btn-ghost">Filtrar</button>
                        <button class="btn-ghost">Exportar</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Concepto</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>${this._handleExpenses(this.expenses)}</tbody>
                </table>
            </div>
        `; 
    }

    _handleExpenses(expenses){        
        if(expenses.length === 0) return html` <tr><td colspan="4">No hay gastos</td></tr>`;
        if(expenses.length > 0 && expenses.length < 8){
            return expenses.map((expense) => html`
                <tr>
                    <td>${formatDate(expense.date)}</td>
                    <td>${expense.supplier}</td>
                    <td>${expense.concept}</td>
                    <td class="amount">${expense.amount}</td>
                </tr>
            `);
        }else if(expenses.length > 8){
            return expenses.slice(0, 8).map((expense) => html`
                <tr>
                    <td>${formatDate(expense.date)}</td>
                    <td>${expense.supplier}</td>
                    <td>${expense.concept}</td>
                    <td class="amount">${expense.amount}</td>
                </tr>
            `);
        }
    }
}

customElements.define("table-expenses", tableExpenses);
