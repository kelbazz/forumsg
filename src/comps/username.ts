import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("user-name")
export class UserName extends LitElement {
  @property({ type: String }) tag = "";

  static styles = [
    css`
      :host {
        display: flex;

        align-items: center;
        gap: 4px;
      }

      span.username {
        font-weight: bold;
        color: var(--dark-puple);
      }

      span.tag {
        font-size: 12px;

        color: var(--light-puple);
        background-color: var(--dark-puple);

        padding: 4px;
        border-radius: 4px;
      }
    `,
  ];
  render() {
    return html`
      <span class="username"><slot></slot></span>
      ${this.tag && this.tag.split(" ").map((s) => html`<span class="tag">${s}</span>`)}
    `;
  }
}
