import { LitElement, html, css } from "lit";

export class StatsCard extends LitElement {
    static properties = {
        label: { type: String },  
        title: { type: String },  
        info:  { type: String },  
        trend: { type: String }, 
    }
    constructor() {
        super();
        this.label = '';
        this.title = '';
        this.info = '';
        this.trend = '';
    }
    static styles = css`
        :host {
            display: block;
        }

        .stats-card {
            background: var(--color-surface);
            border: var(--border-width) solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            gap: var(--space-2);
        }

        .stats-card-label {
            font-family: var(--font-body);
            font-size: var(--text-xs);
            font-weight: var(--font-semibold);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--color-text-muted);
        }

        .stats-card-title {
            font-family: var(--font-body);
            font-size: var(--text-2xl);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            line-height: 1;
        }

        .stats-card-info {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            color: var(--color-text-secondary);
        }

        .stats-card-info.up   { color: var(--color-success); }
        .stats-card-info.down { color: var(--color-danger); }
    `;
    render() {
        return html`
            <article class="stats-card">
                <span class="stats-card-label">${this.label}</span>
                <span class="stats-card-title">${this.title}</span>
                <span class="stats-card-info ${this.trend}">${this.info}</span>
            </article>
        `;
    }    
}

customElements.define("stats-card", StatsCard);