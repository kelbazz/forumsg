// KzDS Imports
import "../css/kzds.css";
import "./kzds.es.js";

// Components
import "../comps/username.ts";
import "../comps/msgbox.ts";
import "../comps/pingbox.ts";
import "emoji-picker-element";
import { Picker } from "emoji-picker-element";
import { MessageBox } from "../comps/msgbox.ts";

// Lit
import { HTMLTemplateResult, html, render } from "lit";

// MsgRoom
import { MRClient } from "msgroom-cl-api";
import type { Message } from "msgroom-cl-api/types/message.ts";
import type { ChatMember } from "msgroom-cl-api/types/member.ts";
import type { NickChangedEvent } from "msgroom-cl-api/types/events.ts";

// Images
import userIcon from "/src/images/users.png";
import botIcon from "/src/images/bots.png";
import staffIcon from "/src/images/staff.png";
import translateIcon from "/src/images/translate.svg";
import bangBlockEmoji from "/src/images/bangBlock.png";
import questionBlockEmoji from "/src/images/questionBlock.png";
import bricksEmoji from "/src/images/bricks.png";
import borderLogo from "/src/images/borderLogo.png";
import litLogo from "/src/images/lit.svg";
import forumLogo from "/src/images/forumLogo.png";
import kelbazLogo from "/src/images/kelbazLogo.png";
import w96Logo from "/src/images/w96.png";
import tuxIcon from "/src/images/tux.png";

// Utils
import { marked } from "marked"; //@ts-ignore
import sanitizeHtml from "sanitize-html"; //@ts-ignore
import insertTextAtCursor from "insert-text-at-cursor";
import { EmojiClickEvent } from "emoji-picker-element/shared";

interface TranslationResponse {
  language: string;
  translation: string;
}

interface Argument {
  name: string;
  description: string;
  type: StringConstructor | BooleanConstructor | NumberConstructor;
}

interface Command {
  aliases: string[];
  hidden?: boolean;
  description: string | HTMLTemplateResult;
  args?: Argument[];
  action: ({ command, args }: { command: Command, args: Record<string, any> }) => void;
}

class ChatApp extends EventTarget {
  static get defaultNick() {
    // Create a random nick from a list of adjectives, nouns and numbers
    // e.g.: Awesome Coder 123
    // e.g.: Cute Kitten 375
    // e.g.: Cool Farmer 634
    // You can add easter eggs to the lists from pop culture or Kelbaz's nick

    const adjectives = [
      "Awesome",
      "Cute",
      "Cool",
      "Funny",
      "Smart",
      "Fluffy",
      "Silly",
      "Crazy",
      "Legendary",
      "Woozy",
      "Triggered",
      "Super",
      "Hilarious",
      "Nerdy",
      "Shy",
      "Boring",
      "Epic",
      "Basic",
      "Evil",
      "Stupid",
      "Angry",
      "Kelbaz's",
    ];

    const nouns = [
      "Coder",
      "Kitten",
      "Puppy",
      "Farmer",
      "Dude",
      "Bro",
      "Girl",
      "Girlfriend",
      "Boy",
      "Boyfriend",
      "Dog",
      "Cat",
      "Llama",
      "Worker",
      "Gamer",
      "Programmer",
      "Engineer",
      "Teacher",
      "Student"
    ];

    // Get a random adjective, noun and 3 digit number
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${randomAdjective} ${randomNoun} ${randomNumber}`;
  };

  static shortPingRegex = /@((?:\\ |[^?!:.\/ <>])+)/g;
  static longPingRegex = /&lt;@([0-9A-Z]{32}-[0-9])(?::.+)?&gt;/g;
  static customEmojiRegex = /:([a-zA-Z0-9_]+):/g;

  static customEmojiMap: Record<string, string> = {
    "bots": botIcon,
    "staff": staffIcon,
    "users": userIcon,
    "translate": translateIcon,
    "bang_block": bangBlockEmoji,
    "question_block": questionBlockEmoji,
    "bricks": bricksEmoji,
    "border": borderLogo,
    "forum": forumLogo,
    "kelbaz": kelbazLogo,
    "lit": litLogo,
    "w96": w96Logo,
    "tux": tuxIcon
  }

  //@ts-ignore
  private client: MRClient;
  private sendButton: HTMLButtonElement;
  private messageInput: HTMLInputElement;
  private msgContainer: HTMLDivElement;
  private emojiButton: HTMLButtonElement;
  private emojiPicker: Picker;
  private userList: HTMLDivElement;
  private userNick: HTMLDivElement;

  // The last position where the caret was before blur
  private lastCaretPosition: number = 0;

  private slashComands: Command[] = [
    {
      aliases: ["help", "h"],
      description: "Show help on commands",
      action: () => {
        this.showHint(html`
          <b>Commands:</b>
          <ul>
            ${this.slashComands.filter((c) => (this.isStaff() || !c.hidden)).map((c) => html`
              <li><b>${c.aliases.join(", ")}</b>${c.args?.map((a) => html` <u>${a.name}</u>`)} - ${c.description}</li>
            `)}
          </ul>
        `);
      }
    },
    {
      aliases: ["translate", "tr"],
      description: "Translate a message and send it to the chat",
      args: [
        {
          name: "message",
          description: "The message to translate",
          type: String
        }
      ],
      action: ({ args }) => {
        const { language, translation } = this.getTranslation(args.message);
        this.sendMessage(`**Forum translate [${language}]:** ${translation}`);
      }
    },
    {
      aliases: ["clear", "clr", "c"],
      description: "Clear the chat",
      action: () => {
        this.msgContainer.innerHTML = "";
        this.addInfoMessage("Chat cleared.");
      }
    },
    {
      aliases: ["me"],
      description: "Send a message to yourself",
      args: [
        {
          name: "message",
          description: "The message to send",
          type: String
        }
      ],
      action: ({ args }) => {
        this.sendMessage(this.serializeMessage(`@${this.client.state.user.username.replace(/ /, "\\ ")} ${args.message}`));
      }
    },
    {
      aliases: ["nick", "n"],
      description: "Change your nickname",
      args: [
        {
          name: "nick",
          description: "The new nickname",
          type: String
        }
      ],
      action: ({ args }) => {
        this.client.changeNick(args.nick);
      }
    },
    {
      aliases: ["block"],
      description: "Block a user",
      args: [
        {
          name: "id",
          description: "The user ID",
          type: String
        }
      ],
      action: ({ args }) => {
        this.blockUser(args.id);
        this.addInfoMessage(`ID ${args.id} blocked.`);
      }
    },
    {
      aliases: ["unblock"],
      description: "Unblock a user",
      args: [
        {
          name: "id",
          description: "The user ID",
          type: String
        }
      ],
      action: ({ args }) => {
        this.unblockUser(args.id);
        this.addInfoMessage(`ID ${args.id} unblocked.`);
      }
    },
    {
      aliases: ["admin", "a"],
      hidden: true,
      description: "Execute admin command",
      args: [
        {
          name: "command",
          description: "The command to execute",
          type: String
        }
      ],
      action: ({ args }) => {
        const cmdArgs = ["a", ...args.command.trim().split(" ")];

        this.client.socket.emit("admin-action", {
          args: cmdArgs
        });
      }
    },
    {
      aliases: ["list", "ls", "users"],
      description: "List all users",
      action: () => {
        this.showHint(html`
          <b>Users:</b>
          <ul>
            ${this.client.state.members.map((m: ChatMember) => html`
              <li><b>${m.user}</b> => <u>${m.session_id}</u></li>
            `)}
          </ul>
        `);
      }
    }
  ]

  constructor() {
    super();

    this.sendButton = document.querySelector("#send-button") as HTMLButtonElement;
    this.messageInput = document.querySelector("#msg-box") as HTMLInputElement;
    this.msgContainer = document.querySelector("#msg-container") as HTMLDivElement;
    this.emojiButton = document.querySelector("#emoji-button") as HTMLButtonElement;
    this.emojiPicker = document.querySelector("#emoji-picker") as Picker;
    this.userList = document.querySelector("#user-list") as HTMLDivElement;
    this.userNick = document.querySelector("#user-nick") as HTMLDivElement;

    this.addEventListener("forum-nick-set", this.init.bind(this), { once: true });
    this.performChecks();
  }

  private init() {
    // Init the client API
    this.client = new MRClient({ username: localStorage.nick });

    // Connect
    this.connect().catch(() => {
      const isFirefox = navigator.userAgent.includes("Firefox");

      this.showPopup({
        title: "Error while connecting to MsgRoom 😢",
        content: `
          <b>The problem could be due to:</b>
          - The CORS Unblocker extension is not installed
          - The CORS Unblocker extension is not enabled
          - Your internet connection is down
          - The server is down
        `,
        buttons: [
          {
            label: "Retry",
            action: () => location.reload()
          },
          {
            label: `Install CORS Unblock from ${isFirefox ? "Mozilla Addons" : "Chrome Web Store"}`,
            action() {
              window.open(
                isFirefox
                  ? "https://addons.mozilla.org/fr/firefox/addon/cors-unblock/"
                  : "https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino",
                "_blank"
              );
            }
          }
        ]
      })
    });

    // Show welcome message
    this.welcomeMessage();
  }

  private isStaff(): boolean {
    return this.client.state.members.some((m: ChatMember) => (m.user === this.client.state.user.username) && m.flags.includes("staff"));
  }

  private showMessage({ content = "", tag = "", username = "", isHtml = false }: Record<string, any>) {
    const msg = document.createElement("message-box") as MessageBox;

    msg.username = username;
    msg.tag = tag;

    msg.innerHTML = isHtml ? content : this.parseMessage(this.serializeMessage(content)).result;

    this.msgContainer.insertAdjacentElement("afterbegin", msg);
  }

  private showPopup(params: { title: string, content: string, buttons: { label: string, action?: () => void }[] }) {
    const { title, content, buttons } = params;

    const popup = document.createElement("message-box") as MessageBox;
    popup.username = "ForumSG";
    popup.tag = "system";

    popup.innerHTML = `
      <h1>${title}</h1>
      <p>${this.parseMessage(this.serializeMessage(content)).result}</p>
      <br/>
      <div id="buttons"></div>
    `;

    buttons.forEach(({ label, action }) => {
      const button = document.createElement("kz-button") as any;
      button.accent = "purple";
      button.innerHTML = label;

      Object.assign(button.style, {
        display: "inline-block",
        width: "fit-content",
        paddingRight: "4px",
      });

      button.addEventListener("click", action);
      popup.querySelector("#buttons")?.appendChild(button);
    });

    this.msgContainer.insertAdjacentElement("afterbegin", popup);
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

  private blockUser(id: string) {
    const blackList = new Set(JSON.parse(localStorage.blackList));
    blackList.add(id);

    console.debug(Array.from(blackList));

    localStorage.blackList = JSON.stringify(Array.from(blackList));
  }

  private unblockUser(id: string) {
    const blackList = new Set(JSON.parse(localStorage.blackList));
    blackList.delete(id);

    console.debug(Array.from(blackList));

    localStorage.blackList = JSON.stringify(Array.from(blackList));
  }

  private get blackList(): string[] {
    return JSON.parse(localStorage.blackList);
  }

  private async showNickSetter(default_nick?: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const defaultNick = (default_nick || ChatApp.defaultNick);
      let nick = defaultNick;

      const handleInput = (evt: InputEvent) => {
        nick = (evt.target as HTMLInputElement).value;
      }

      const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key !== "Enter") return;
        handleClick();
      }

      const handleClick = () => {
        this.showHint();
        resolve(nick || defaultNick);
      }

      this.showHint(html`
        <b>Set your nickname:</b>
        <br /><br />
        <div style="display:flex;gap:4px;align-items:center">
          <input @input=${handleInput} style="flex:1" @keydown=${handleKeyDown} type="text" value="${nick}" placeholder="${defaultNick}" id="nick-input" />
          <kz-button @click=${handleClick} style="display:inline-block" accent="purple" id="nick-set">Confirm</kz-button>
        </div>
      `);
    });
  }

  private async performChecks() {
    // Check for blackList
    if (!Array.isArray(localStorage.blackList)) {
      localStorage.blackList = "[]";
    }

    // Check for nick
    const event = new CustomEvent("forum-nick-set");

    // Check for nick in local storage
    if (!localStorage.nick) {
      const nick = await this.showNickSetter();
      localStorage.nick = nick;
    }

    this.dispatchEvent(event);
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
          @click=${async () => {
          this.changeNick(
            await this.showNickSetter(username)
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
    this.emojiButton.addEventListener("click", this.handleEmojiButton.bind(this));
    this.messageInput.addEventListener("input", this.handleAutocomplete.bind(this) as any);

    // Emoji Picker
    this.emojiPicker.addEventListener("emoji-click", this.handleEmojiClick.bind(this));

    // Visibility
    // document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));

    // @ts-ignore Client events
    this.client.on("message", this.handleMessage.bind(this)); //@ts-ignore
    this.client.on("user-join", this.handleUserJoin.bind(this)); //@ts-ignore
    this.client.on("user-leave", this.handleUserLeave.bind(this)); //@ts-ignore
    this.client.on("nick-changed", this.handleNickChange.bind(this)); //@ts-ignore
    this.client.on("sys-message", this.handleSystemMessage.bind(this));

    // Caret position events
    this.messageInput.addEventListener("focus", this.handleCaretPosition.bind(this));
    this.messageInput.addEventListener("input", this.handleCaretPosition.bind(this));
    this.messageInput.addEventListener("click", this.handleCaretPosition.bind(this));
    this.messageInput.addEventListener("keyup", this.handleCaretPosition.bind(this));
    this.messageInput.addEventListener("blur", this.handleCaretPosition.bind(this));
  }

  private handleEmojiButton() {
    this.emojiPicker.classList.toggle("shown");
  }

  private handleEmojiClick(event: EmojiClickEvent) {
    insertTextAtCursor(this.messageInput, event.detail.unicode);
    this.emojiPicker.classList.remove("shown");
  }

  private handleCaretPosition() {
    this.lastCaretPosition = this.messageInput.selectionStart || 0;
    console.debug(this.lastCaretPosition);
  }

  private handleSystemMessage(evt: { message: string, type: string, isHtml: boolean }) {
    console.debug(evt)
    this.showMessage({ content: evt.message.replace(/\n/g, "<br />"), tag: "system", username: "Server", isHtml: evt.isHtml });
  }

  // private handleVisibilityChange({ visible }: { visible: boolean }) {
  //   if (visible) {
  //     document.title = "ForumSG";
  //   } else {
  //     // this.client.
  //   }
  // }

  private handleAutocomplete(event: KeyboardEvent) {
    if (event.key === "Enter") return;
    this.showHint();

    const input = event.target as HTMLInputElement;
    const { value } = input as HTMLInputElement;
    const { selectionStart } = input;

    // Pings
    const usernameMatch = value.slice(0, selectionStart ?? 0).match(/@((?:\\ |[^?!:.\/ <>])+)$/);
    const username = usernameMatch?.[1].replace(/\\ /g, " ");

    if (username) {
      const membersList = this.client.state.members
        .filter((member: ChatMember) => member.user.startsWith(username))

      const handleClick = (event: Event) => {
        if (!usernameMatch) return;
        const target: HTMLAnchorElement = event.target as HTMLAnchorElement;

        input.value = input.value.replace(usernameMatch?.[0], `@${target.textContent?.replace(/ /g, "\\ ")} `);
        input.focus();
        this.showHint();
      }

      this.showHint(html`
        <b>@Pings</b>
        <p>Pings allow you to send a message targeting a specific user</p>
        <br />
        <p>Here are available users:</p>
        <ul>
          ${membersList.map((member: ChatMember) => html`
            <li><a @click=${handleClick} href="#">${member.user}</a></li>
          `)}
        </ul>
      `);
    }

    // Slash commands
    if (value.startsWith("/")) {
      if (value === "/") {
        this.showHint(html`
          <b>/Commands</b>
          <p>Commands are autocompleted by adding the rest of the command to the message</p>
          <p>Try <b>/help</b> for a list of commands</p>
        `);
        return;
      };

      const slash = value.slice(1).split(" ")[0];
      const command: Command = this.slashComands.find(({ aliases }) => aliases.includes(slash)) as Command;

      if (command && (this.isStaff() || !command.hidden)) {
        this.showCommandHint(command);
      } else {
        // Show a message to the user and show the clickable hints
        const handleClick = (command: Command) => {
          // Create clickable links to auto complete the command
          input.value = `/${command.aliases[0]} `;
          input.focus();
          this.showCommandHint(command);
        }

        this.showHint(html`
          <b>/${slash}</b>
          <p>Command not found</p>
          <p>Here are some possible commands:</p>
          <ul>
            ${this.slashComands.filter(({ aliases, hidden }) => (this.isStaff() || !hidden) && aliases.map(a => a.startsWith(slash)).reduce((a, b) => a || b)).map((cmd) => html`
                <li>
                  <a @click=${handleClick.bind(this, (cmd as Command))} href="#">/${cmd.aliases[0]}</a> - ${cmd.description}
                </li>
              `)
          }
          </ul>
        `);
      }
    }

    // Hint
    if (value === "?") {
      this.showHint(html`
        <h1>What's Forum?</h1>
        <br />
        <p>
          ForumSG is a MsgRoom client made by Kelbaz empowering MsgRoom with a better
          user experience and more features like pings.
        </p>
        <p>
          Forum is open source and available on <a href="https://github.com/Kelbazz/ForumSG">GitHub</a>.
          Contributions are welcome and appreciated!
        </p>
      `);
    }
  }

  private showCommandHint(command: Command) {
    this.showHint(html`
          <b>/${command.aliases[0]}</b>
          <p>${command?.description}</p>
          ${command?.args
        ? html`
              <br />
              <i>Args:</i>
              <ol style="margin:0">
                ${command.args.map((arg) => html`
                  <li><b>${arg.name}</b>: <i><u>${arg.type.name}</u></i> - ${arg.description}</li>
                `)}
              </ol>
            ` : ""}
        `);
  }

  private showHint(innerHTML?: HTMLTemplateResult) {
    const hintbox = document.querySelector("#hint-box") as HTMLDivElement;

    if (innerHTML) {
      render(innerHTML, hintbox);
      hintbox.style.display = "block";
    } else {
      hintbox.style.display = "none";
    }
  }

  private handleNickChange(evt: NickChangedEvent) {
    const { session_id, oldUser, newUser } = evt;

    console.debug("changing nick", evt);

    // Check if the vars are defined
    if (!oldUser || !newUser) return;

    // Check if the session_id is user's own
    if (session_id === this.client.state.sessionId) {
      this.renderNickUI(newUser);
    }

    // Show a message to the user
    this.addInfoMessage(`${oldUser} has changed their nickname to ${newUser}`);
    // Rerender the user list
    this.renderUserList();
  }

  private resetInput() {
    this.messageInput.value = "";
    this.messageInput.focus();
    this.showHint();
  }

  private sendMessage(message: string) {
    this.client.sendTextMessage(message);
  }

  private handleSending() {
    const { value } = this.messageInput;

    if (value) {
      if (value.startsWith("/")) {
        const slash = value.slice(1).split(" ")[0];
        const command = this.slashComands.find(({ aliases }) => aliases.includes(slash)) as Command | undefined;

        if (command) {
          const args = this.parseCommandArguments(command, value);

          this.resetInput();
          this.handleCommand(command, args);
        }

        return;
      };

      this.sendMessage(this.serializeMessage(value));
      this.resetInput();
    }
  }

  private parseCommandArguments(command: Command, value: string) {
    const valueSplited = value.slice(value.indexOf(" ") + 1);
    const args: Record<string, any> = {};

    // Check for args and if there is only one
    if (!command.args) return {};
    if (command.args.length === 1) return {
      [command.args[0].name]: valueSplited
    };

    // Split arguments but handle " to be able to add spaces in args
    // e.g: "Hello World" => { argName: "Hello", argName2: "World"} }
    // e.g: 'Hello "World 2" hey' => { argName: "Hello", argName2: "World 2", argName3: "hey"} }

    let currentArg = "";
    let argIndex = 0;
    let withinQuotes = false;

    function toType(value: string, type: any) {
      if (type === String) return String(value);
      if (type === Number) return Number(value);
      if (type === Boolean) return !!value;
    }

    for (const i in valueSplited.split("")) {
      const char = valueSplited[i];


      if (char === '"') {
        withinQuotes = !withinQuotes;
      } else if (char === " " && !withinQuotes) {
        const arg = command.args[argIndex];

        args[arg.name] = toType(currentArg, arg.type);
        currentArg = "";
      } else {
        currentArg += char;
      }

      console.debug(char, withinQuotes, currentArg);
    }

    if (currentArg.trim() !== "") {
      args[command.args[argIndex].name] = toType(currentArg, command.args[argIndex].type);
    }

    return args;
  }

  private handleCommand(command: Command, args: Record<string, any>) {
    const { action } = command;

    action.call(this, { command, args });
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
    const pingRegex = ChatApp.shortPingRegex;

    let replaced = content.replace(/\\\\/g, "");
    let pingReplaces = replaced.replace(pingRegex, (_: any, value: string) => {
      const user: ChatMember | undefined = this.getUser(value.replace(/\\ /g, " "));
      if (!user) return `@${value}`;

      return `*<@${user.session_id}:**${user.user}**>*`;
    });

    return pingReplaces;
  }

  private parseMessage(content: string) {
    // Parse the message to final HTML
    // Need to parse pings with session ids starting with `@` to `<ping-box>(name from session id)</ping-box>`
    const pingRegex = ChatApp.longPingRegex;
    const pingRegexRaw = ChatApp.shortPingRegex;
    const pingedUsers: ChatMember[] = [];

    let replaced = content.replace(/\n/g, "<br>");
    let parsed = marked.parse(replaced);
    let sanitized = sanitizeHtml(parsed, { allowedTags: ["h1", "h2", "h3", "br", "i", "b", "p", "strong", "em", "ul", "ol", "li"] });
    let pingReplaces = sanitized
      .replace(pingRegex, (_: RegExpMatchArray, sessionID: string) => {
        const user = this.getUserFromSessionID(sessionID);
        if (!user) return `<ping-box error>Unknown User</ping-box>`;

        pingedUsers.push(user);

        return `<ping-box>${user.user}</ping-box>`;
      }).replace(pingRegexRaw, (_: RegExpMatchArray, username: string) => {
        const nick = username.replace(/\\ /g, " ");
        const user = this.getUserFromNick(nick);
        if (!user) return `<ping-box error>Unknown User</ping-box>`;

        pingedUsers.push(user);

        return `<ping-box>${user.user}</ping-box>`;
      });
    let customEmojiReplaces = pingReplaces.replace(ChatApp.customEmojiRegex, (_: RegExpMatchArray, emojiName: string) => {
      const emoji: string = ChatApp.customEmojiMap[emojiName]!;
      if (!emoji) return `:${emojiName}:`;

      return `<img class="emoji" src="${emoji}">`;
    });

    return { result: customEmojiReplaces, pingedUsers: pingedUsers };
  }

  private getTranslation(content: string = ""): TranslationResponse {
    const url = [
      "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
      "sl=auto",
      `tl=en`,
      `q=${encodeURI(content)}`,
    ].join("&");

    const request = new XMLHttpRequest();
    request.open("GET", url, false); // Make the request synchronous by setting the third argument to false
    request.send();

    if (request.status === 200) {
      const response = JSON.parse(request.responseText);

      const language = response[2] || "en";
      const translation = response[0]?.[0]?.[0] || "";

      return {
        language,
        translation,
      }
    } else {
      throw new Error(`HTTP request failed with status ${request.status}`);
    }
  }

  private handleMessage(msg: Message) {
    // Check if user is blacklisted
    if (this.blackList.includes(msg.id)) {
      return;
    }

    const { result: parsedContent, pingedUsers } = this.parseMessage(msg.content);
    const textContent = sanitizeHtml(parsedContent, { allowedTags: null });

    // Create the message
    const msgBox = document.createElement("message-box") as MessageBox;
    msgBox.tag = this.getUserFromSessionID(msg.session_id)?.flags.join(" ") || "";
    msgBox.username = msg.user;
    msgBox.innerHTML = parsedContent;

    // Send ping event if the user is pinged
    if (pingedUsers.some(({ session_id }) => session_id === this.client.state.sessionId)) {
      const event = new CustomEvent("ping", {
        detail: {
          from: this.getUserFromSessionID(msg.session_id) || {}
        },
      })

      this.dispatchEvent(event);
    }

    // Get the translation
    let { language, translation } = this.getTranslation(textContent);
    if (textContent.toLowerCase() !== translation.toLowerCase() && language !== "en") {
      msgBox.translation = translation;
    };

    // Add the message
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

//@ts-ignore
console.debug(chatApp.client);
//@ts-ignore
window.chat = chatApp;