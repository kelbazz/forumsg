import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pop-up")
export class PopUp extends LitElement {
  @property({ type: String }) tag = "";

  static styles = [
    css`
      :host {
        display: flex;

        align-items: flex-start;
        gap: 8px;

        /* Boxy look */
        padding: 8px;

        border: 2px solid var(--bluck);
        border-radius: 8px;

        background-color: var(--kream);
        box-shadow: 0 2px var(--bluck);
      }
    `,
  ];
  render() {
    return html`
      <kz-header type="subtitle">Welcome</kz-header>
    `;
  }
}
