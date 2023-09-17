// KzDS Imports
import "../css/kzds.css";
import "./kzds.es.js";

// Components
import "../comps/username.ts";
import "../comps/msgbox.ts";
import { MessageBox } from "../comps/msgbox.ts";

// Lit
import { html, render } from "lit";
//@ts-ignore
import Client from "https://esm.sh/msgroom@nightly";
import { Message, User } from "msgroom/dist/types/events";

// Images
import userIcon from "/src/images/users.png";
import botIcon from "/src/images/bots.png";
import staffIcon from "/src/images/staff.png";

class ChatApp {
  static defaultNick = "Forum User";

  private client: Client;
  private sendButton: HTMLButtonElement;
  private messageInput: HTMLInputElement;
  private msgContainer: HTMLDivElement;
  private userList: HTMLDivElement;
  private userNick: HTMLDivElement;

  constructor() {
    this.checkData();

    this.client = new Client(
      localStorage.getItem("nick"), "",
      {
        welcomeMessage: "",
        blockSelf: false,
      }
    );

    this.sendButton = document.querySelector("#send-button") as HTMLButtonElement;
    this.messageInput = document.querySelector("#msg-box") as HTMLInputElement;
    this.msgContainer = document.querySelector("#msg-container") as HTMLDivElement;
    this.userList = document.querySelector("#user-list") as HTMLDivElement;
    this.userNick = document.querySelector("#user-nick") as HTMLDivElement;

    this.welcomeMessage();
  }
  checkData() {
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
    this.client.name = nick;

    this.renderNickUI();
  }

  public async connect() {
    // Connect
    await this.client.connect();

    // Setup
    this.addEventListeners();
    this.renderUserList();
    this.renderNickUI();
  }
  private renderNickUI() {

    render(
      html`
        <user-name
          @click=${() => {
          this.changeNick(
            prompt("Enter your nickname", this.client.name) || this.client.name
          )
        }}
        >${this.client.name}</user-name>
      `,
      this.userNick
    );
  }

  private addEventListeners() {
    this.sendButton.addEventListener("click", this.handleSending.bind(this));
    this.messageInput.addEventListener("keydown", this.handleKeyDown.bind(this));

    this.client.on("message", this.handleMessage.bind(this));
    this.client.on("user-join", this.handleUserJoin.bind(this));
    this.client.on("user-leave", this.handleUserLeave.bind(this));
    this.client.on("nick-changed", this.handleNickChanged.bind(this));
  }
  private handleNickChanged(user: User) {
    console.log(user);
  }

  private handleSending() {
    const value = this.messageInput.value;

    if (value && !value.startsWith("/")) {
      this.client.sendMessage(value);

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

  private handleMessage(msg: Message) {
    const msgBox = document.createElement("message-box") as MessageBox;
    msgBox.tag = msg.author.flags.join(" ");
    msgBox.username = msg.author.nickname;
    msgBox.innerHTML = msg.content;

    this.msgContainer.insertAdjacentElement("afterbegin", msgBox);
  }

  private handleUserJoin(user: User) {
    this.addInfoMessage(`${user.nickname} has joined the chat`);

    // Add user to client.users
    this.client.users[user.sessionID] = user;

    this.renderUserList();
  }

  private handleUserLeave(user: User) {
    this.addInfoMessage(`${user.nickname} has left the chat`);

    // Remove user from client.users
    delete this.client.users[user.sessionID];

    this.renderUserList();
  }

  private addInfoMessage(message: string) {
    const msgBox = document.createElement("div");
    msgBox.classList.add("info-box");
    msgBox.innerHTML = message;

    this.msgContainer.insertAdjacentElement("afterbegin", msgBox);
  }

  private renderUserList() {
    const members: { users: User[]; staff: User[]; bots: User[] } = {
      users: Object.values(this.client.users),
      staff: [],
      bots: [],
    }

    members.users.forEach((user: User) => {
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
          return html`
            <div class="user-list-header">
              <img src="${(iconMap as Record<string, any>)[type]}" alt="logo" />
              <b>${type}</b>
            </div>
            <ul>
              ${(members as Record<string, User[]>)[type.toLowerCase()].map((user: User) => html`<li>${user.nickname}</li>`)}
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