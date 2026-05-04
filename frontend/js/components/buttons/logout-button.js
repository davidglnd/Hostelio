import { LitElement, html } from 'lit';
import { logout } from "../../modules/auth/logout.js";

export class MyButton extends LitElement {
  static properties = {
    label: { type: String },
  };

  constructor() {
    super();
    this.label = 'Cerrar sesión';
  }
  render() {
    return html`
      <button @click="${logout}">
        ${this.label}
      </button>
    `;
  }
}

customElements.define('my-button', MyButton);