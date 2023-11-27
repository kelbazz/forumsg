import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import customEmoji from "../js/customEmoji.ts";

// Custom Emoji Element
@customElement("custom-emoji")
export class CustomEmoji extends LitElement {
  @property({ type: String }) emoji: string = "forum";

  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: middle;

        height: 22px;
        aspect-ratio: 1;
      }

      img {
        width: 100%;
        height: 100%;

        object-fit: contain;
      }
    `
  ]

  render() {
    const emoji = customEmoji.find(emoji => emoji.shortcodes?.includes(this.emoji)) ?? customEmoji[0];
    return html`
      <img src="${emoji.url}" alt=":${emoji.shortcodes?.[0]}:" />
    `;
  }
}