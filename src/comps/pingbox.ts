import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ping-box")
export class PingBox extends LitElement {
  @property({ type: Boolean, reflect: true }) error = false;

  static styles = [
    css`
      .content {
        font-size: 12px;

        color: var(--light-puple);
        background-color: var(--dark-puple);

        padding: 4px;
        border-radius: 4px;

        cursor: pointer;

        &.error {
          color: var(--kream);
          background-color: var(--redow);
        }
      }
    `,
  ]

  render() {
      return html`
        <span class="content ${this.error ? "error" : ""}" @click=${this.onClick}>@<slot></slot></span>
      `
  }

  onClick() {
    
  }
}