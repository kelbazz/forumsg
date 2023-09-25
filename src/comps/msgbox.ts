import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import userAvatar from "/src/images/user.png";
import translate from "/src/images/translate.svg";

@customElement("message-box")
export class MessageBox extends LitElement {
  @property({ type: String, reflect: true }) tag: string = "";
  @property({ type: String, reflect: true }) username: string = "";
  @property({ type: Boolean, reflect: true }) translation: string = "";

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

      div.content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      div.translation {
        padding: 0 4px;

        display: flex;
        align-items: center;
        gap: 4px;
        
        > img {
          width: 16px;
          aspect-ratio: 1;
        }
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
        ${this.translation
        ? html`
            <div class="translation">
              <img src="${translate}" />
              <i>${this.translation}</i>
            </div>
          `
        : ""}
      </div>
    `;
  }
}
