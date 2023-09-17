import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import userAvatar from '/src/images/user.png';

@customElement("message-box")
export class MessageBox extends LitElement {
  @property({ type: String, reflect: true }) tag = "";
  @property({ type: String, reflect: true }) username = "";

  static styles = [
    css`
      :host {
        display: flex;

        align-items: flex-start;
        gap: 8px;

        word-wrap: break-word;

        /* Boxy look */
        padding: 8px;

        border: 2px solid var(--bluck);
        border-radius: 8px;

        background-color: var(--kream);
        box-shadow: 0 2px var(--bluck);
      }

      img.avatar {
        width: 32px;
        aspect-ratio: 1;
      }
    `,
  ];
  render() {
    return html`
      <img class="avatar" alt="avatar" src="${userAvatar}" />
      <div class="content">
        <user-name tag="${this.tag}">${this.username}</user-name>
        <div class="message"><slot></slot></div>
      </div>
    `;
  }
}
