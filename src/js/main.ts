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

class ChatApp {
  static defaultNick = "Forum User";

  private client: Client;
  private sendButton: HTMLButtonElement;
  private messageInput: HTMLInputElement;
  private msgContainer: HTMLDivElement;
  private userList: HTMLDivElement;

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

  // private changeNick(nick: string | null) {
  //   if (!nick) return;

  //   localStorage.setItem("nick", nick);
  //   this.client.name = nick;
  // }

  public async connect() {
    // Connect
    await this.client.connect();

    // Init Name


    // Setup
    this.addEventListeners();
    this.renderUserList();
  }

  private addEventListeners() {
    this.sendButton.addEventListener("click", this.handleSending.bind(this));
    this.messageInput.addEventListener("keydown", this.handleKeyDown.bind(this));

    this.client.on("message", this.handleMessage.bind(this));
    this.client.on("user-join", this.handleUserJoin.bind(this));
    this.client.on("user-leave", this.handleUserLeave.bind(this));
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
    const users: User[] = Object.values(this.client.users);
    const staff: User[] = [];
    const bots: User[] = [];

    users.forEach((user: User) => {
      const { flags } = user;

      if (flags.includes("staff")) {
        staff.push(user);
        users.splice(users.indexOf(user), 1);
      } else if (flags.includes("bot")) {
        bots.push(user);
        users.splice(users.indexOf(user), 1);
      }
    });

    render(
      html`
        <div class="user-list-header">
          <img src="src/assets/staff.png" alt="logo"/>
          <b>Staff</b>
        </div>
        <ul>
          ${staff.map((user) => html`<li>${user.nickname}</li>`)}
        </ul>

        <div class="user-list-header">
          <img src="src/assets/users.png" alt="logo"/>
          <b>Users</b>
        </div>
        <ul>
          ${users.map((user) => html`<li>${user.nickname}</li>`)}
        </ul>

        <div class="user-list-header">
          <img src="src/assets/bots.png" alt="logo"/>
          <b>Bots</b>
        </div>
        <ul>
          ${bots.map((user) => html`<li>${user.nickname}</li>`)}
        </ul>
      `,
      this.userList
    );
  }
}

const chatApp = new ChatApp();
chatApp.connect();
