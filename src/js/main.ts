// KzDS Imports
import "../css/kzds.css";
import "./kzds.es.js";

// Components
import "../comps/username.ts";
import "../comps/msgbox.ts";
import "../comps/pingbox.ts";
import { MessageBox } from "../comps/msgbox.ts";

// Lit
import { html, render } from "lit";

// @ts-ignore // MsgRoom
import { MRClient } from "https://esm.sh/gh/kelbazz/msgroom-api";
import type { Message } from "msgroom-cl-api/types/message.ts";
import type { ChatMember } from "msgroom-cl-api/types/member.ts";
import type { NickChangedEvent } from "msgroom-cl-api/types/events.ts";

// Images
import userIcon from "/src/images/users.png";
import botIcon from "/src/images/bots.png";
import staffIcon from "/src/images/staff.png";

// Utils

import { marked } from "marked"; //@ts-ignore
import sanitizeHtml from "sanitize-html";

class ChatApp {
  static defaultNick = "Forum User";

  private client: MRClient;
  private sendButton: HTMLButtonElement;
  private messageInput: HTMLInputElement;
  private msgContainer: HTMLDivElement;
  private userList: HTMLDivElement;
  private userNick: HTMLDivElement;

  constructor() {
    this.checkData();

    this.client = new MRClient({ username: localStorage.nick });

    this.sendButton = document.querySelector("#send-button") as HTMLButtonElement;
    this.messageInput = document.querySelector("#msg-box") as HTMLInputElement;
    this.msgContainer = document.querySelector("#msg-container") as HTMLDivElement;
    this.userList = document.querySelector("#user-list") as HTMLDivElement;
    this.userNick = document.querySelector("#user-nick") as HTMLDivElement;

    this.welcomeMessage();
  }

  private getUserFromSessionID(sessionID: string) {
    return this.client.state.members.find((member: ChatMember) => member.session_id === sessionID);
  }

  private getUserFromNick(nick: string) {
    return this.client.state.members.find((member: ChatMember) => member.user === nick);
  }

  private getUser(value: string) {
    return this.getUserFromSessionID(value) || this.getUserFromNick(value);
  }

  private checkData() {
    if (!localStorage.getItem("nick")) {
      localStorage.setItem(
        "nick",
        prompt("Enter your nickname", ChatApp.defaultNick) || ChatApp.defaultNick
      );
    }
  }
  private welcomeMessage() {
    this.addInfoMessage("Welcome to Forum! The best MsgRoom client!");
  }

  private changeNick(nick: string | null) {
    if (!nick) return;

    localStorage.setItem("nick", nick);
    this.client.changeNick(nick);
  }

  public async connect() {
    // Connect
    await this.client.login();

    // Setup
    this.addEventListeners();
    this.renderUserList();
    this.renderNickUI();
  }
  private renderNickUI(newName?: string) {
    let username = newName || this.client.state.user.username;

    render(
      html`
        <user-name
          @click=${() => {
          this.changeNick(
            prompt("Enter your nickname", username) || username
          )
        }}
        >${username}</user-name>
      `,
      this.userNick
    );
  }

  private addEventListeners() {
    // UI events
    this.sendButton.addEventListener("click", this.handleSending.bind(this));
    this.messageInput.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Visibility
    // document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));

    // Client events
    this.client.on("message", this.handleMessage.bind(this));
    this.client.on("user-join", this.handleUserJoin.bind(this));
    this.client.on("user-leave", this.handleUserLeave.bind(this));
    this.client.on("nick-changed", this.handleNickChange.bind(this));
  }

  // private handleVisibilityChange({ visible }: { visible: boolean }) {
  //   if (visible) {
  //     document.title = "ForumSG";
  //   } else {
  //     // this.client.
  //   }
  // }

  private handleNickChange(evt: NickChangedEvent) {
    const { session_id, oldUser, newUser } = evt;

    if (session_id === this.client.state.sessionId) {
      console.log("ok");
      this.renderNickUI(newUser);
    }

    this.addInfoMessage(`${oldUser} has changed their nickname to ${newUser}`);

    this.renderUserList();
  }

  private handleSending() {
    const value = this.messageInput.value;

    if (value && !value.startsWith("/")) {
      this.client.sendTextMessage(this.serializeMessage(value));

      //@ts-ignore
      this.messageInput.shadowRoot.querySelector("input").value = "";
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const { key, shiftKey } = event;
    if (key === "Enter" && !shiftKey) {
      this.handleSending();
    }
  }

  private serializeMessage(content: string) {
    // Change the message to convert correctly pings
    // e.g.: `@Kelbaz` => <@(sessionID of Kelbaz):Kelbaz>
    // e.g.: `@Hello` => <@(sessionID of Hello):Hello>
    // e.g.: `@Hello World` => <@(sessionID of Hello):Hello>
    // e.g.: `@Hello\ World` => <@(sessionID of "Hello World"):Hello World>
    // So the "\ " is escaped and that's how to include spaces

    // Regex to parse pings like `@Kelbaz` or `@Hello\ World`
    const pingRegex = /@((?:\\ |[^?!:.\/ ])+)/g;

    let replaced = content.replace(/\\\\/g, "");
    let pingReplaces = replaced.replace(pingRegex, (_: any, value: string) => {
      const user: ChatMember | null = this.getUser(value.replace(/\\ /g, " "));
      if (!user) return `@${value}`;

      return `*<@${user.session_id}:**${user.user}**>*`;
    });

    return pingReplaces;
  }

  private parseMessage(content: string) {
    // Parse the message to final HTML
    // Need to parse pings with session ids starting with `@` to `<ping-box>(name from session id)</ping-box>`
    const pingRegex = /&lt;@([0-9A-Z]{32}-[0-9])(?::.+)?&gt;/g;

    console.log(content, content.match(pingRegex));

    let replaced = content.replace(/\n/g, "<br>");
    let parsed = marked.parse(replaced);
    let sanitized = sanitizeHtml(parsed, { allowedTags: ["h1", "h2", "h3", "br", "i", "b", "p", "strong", "em"] });
    let pingReplaces = sanitized
      .replace(pingRegex, (_: RegExpMatchArray, sessionID: string) => {
        const user = this.getUserFromSessionID(sessionID);

        return user ? `<ping-box>${user.user}</ping-box>` : `<ping-box error>Unknown ID</ping-box>`;
      });

    return pingReplaces;
  }

  private handleMessage(msg: Message) {
    const msgBox = document.createElement("message-box") as MessageBox;
    msgBox.tag = this.getUserFromSessionID(msg.session_id).flags.join(" ");
    msgBox.username = msg.user;
    msgBox.innerHTML = this.parseMessage(msg.content);

    this.msgContainer.insertAdjacentElement("afterbegin", msgBox);
  }

  private handleUserJoin(user: ChatMember) {
    this.addInfoMessage(`${user.user} has joined the chat`);

    this.renderUserList();
  }

  private handleUserLeave(user: ChatMember) {
    this.addInfoMessage(`${user.user} has left the chat`);

    this.renderUserList();
  }

  private addInfoMessage(message: string) {
    const msgBox = document.createElement("div");
    msgBox.classList.add("info-box");
    msgBox.innerHTML = message;

    this.msgContainer.insertAdjacentElement("afterbegin", msgBox);
  }

  private renderUserList() {
    const members: { users: ChatMember[]; staff: ChatMember[]; bots: ChatMember[] } = {
      users: structuredClone(this.client.state.members),
      staff: [],
      bots: [],
    }

    members.users.forEach((user: ChatMember) => {
      const { flags } = user;

      if (flags.includes("staff")) {
        members.staff.push(user);
        members.users.splice(members.users.indexOf(user), 1);
      } else if (flags.includes("bot")) {
        members.bots.push(user);
        members.users.splice(members.users.indexOf(user), 1);
      }
    });

    const iconMap = {
      Staff: staffIcon,
      Bots: botIcon,
      Users: userIcon,
    }

    render(
      html`
        ${["Staff", "Users", "Bots"].map((type) => {
        if ((members as Record<string, ChatMember[]>)[type.toLowerCase()].length === 0) return;

        return html`
            <div class="user-list-header">
              <img src="${(iconMap as Record<string, any>)[type]}" alt="logo" />
              <b>${type}</b>
            </div>
            <ul>
              ${(members as Record<string, ChatMember[]>)[type.toLowerCase()].map((user: ChatMember) => html`<li>${user.user}</li>`)}
            </ul>
          `
      })}
  `,
      this.userList
    );
  }
}

const chatApp = new ChatApp();
chatApp.connect();

// console.log(chatApp.client);
// window.chat = chatApp;
