import { io } from 'https://esm.sh/socket.io-client@4.7.2';

/**
 * Global MsgRoom parameters.
 */
const GLOB_CONFIG = {
    /**
     * The MsgRoom server url.
     */
    serverUrl: "wss://msgroom.windows96.net",

    /**
     * Gets or sets the maximum time (in ms) for requests to complete.
     */
    opTimeout: 3000
}

/**
 * Represents a MsgRoom client.
 */
class MRClient {
    /**
     * Active socket
     * @type {import('socket.io-client').Socket}
     */
    socket = null;

    /**
     * Current user state.
     */
    state = {
        /** 
         * Represents the client user.
         * @type {import('../types/user').User} 
         */
        user: null,

        /**
         * The current members.
         * @type {import('../types/member').ChatMember[]}
         */
        members: [],

        /**
         * The session ID of the user.
         * @type {string}
         */
        sessionId: null
    }

    /**
     * Creates a new MsgRoom client.
     * @param {*} options The options to use.
     */
    constructor(options) {
        const pars = {
            username: "anonymous",
            ...options
        };

        this.state.user = {
            username: pars.username,
            id: null
        };

        this.socket = io(GLOB_CONFIG.serverUrl);
    }

    /**
     * Registers client events.
     */
    #registerEvents() {
        // User join event
        this.socket.on('user-join', /** @param {import('../types/member').ChatMember} member */ (member) => {
            // Update member list
            let memberIdx = this.state.members.findIndex(x => x.session_id == member.session_id);

            if(memberIdx !== -1)
                this.state.members[memberIdx] = member;
            else
                this.state.members.push(member);

            this.emit('user-join', member);
        });

        // User leave event
        this.socket.on('user-leave', (member) => {
            let memberIdx = this.state.members.findIndex(x => x.session_id == member.session_id);
            let finalState = member;

            if(memberIdx !== -1) {
                finalState = { ... this.state.members[memberIdx] };
                this.state.members.splice(memberIdx, 1);
            }
            
            this.emit("user-leave", finalState);
        });

        // Nickname changed event
        this.socket.on('nick-changed', /** @param {import('../types/events').NickChangedEvent} change */ (change) => {
            // Update user object
            let memberIdx = this.state.members.findIndex(x => x.session_id == change.session_id);

            if(memberIdx !== -1)
                this.state.members[memberIdx].user = change.newUser;

            this.emit('nick-changed', this.state.members[memberIdx] || change);
        });

        // Online fetch event
        this.socket.on('online', /** @param {import('../types/member').ChatMember[]} members */ (members) => {
            // Update local members count
            this.state.members = members;
            this.emit('online', this.state.members);
        });

        // Message event
        this.socket.on('message', /** @param {import('../types/message').Message} message */ (message) => {
            this.emit('message', message); 
        });

        // Sys message event
        this.socket.on('sys-message', /** @param {import('../types/message').SysMessage} message */(message) => {
            this.emit('sys-message', message);
        });

        // Error message event
        this.socket.on('werror', (error) => {
            this.emit('error', error);
        });
    }

    /**
     * Fetches online members.
     */
    fetchOnlineMembers() {
        return new Promise((resolve, reject) => {
            let timeoutInt = setTimeout(()=>reject("Online members fetch timeout"), GLOB_CONFIG.opTimeout);
            
            // Accept
            this.socket.once('online', /** @param {import('../types/member').ChatMember[]} members */ (members)  => {
                clearTimeout(timeoutInt);
                this.state.members = members;
                resolve(this.state.members);
            });

            // Emit online event
            this.socket.emit('online');
        });
    }

    /**
     * Tasks to execute before we can declare ourselves ready.
     */
    async #preReady() {
        await this.fetchOnlineMembers();
    }

    /**
     * Sends a text message.
     * @param {string} text The text to send.
     */
    sendTextMessage(text) {
        this.socket.emit('message', {
            type: "text",
            content: (typeof text === 'string') ? text : `${text}`
        });
    };

    /**
     * Changes the nickname of this client.
     * @param {string} nick The nickname to set.
     */
    changeNick(nick) {
        if(typeof nick !== 'string')
            throw new Error("Invalid nick specified.");

        return new Promise((resolve, reject) => {
            let timeoutInt = setTimeout(()=>reject("Nick change timeout"), GLOB_CONFIG.opTimeout);
            
            // Accept
            this.socket.once('nick-changed', /** @param {import('../types/events').NickChangedEvent} change */ (change) => {
                clearTimeout(timeoutInt);

                if(change.session_id == this.state.sessionId)
                    resolve(change.newUser);
            });

            this.socket.emit('change-user', nick);
        });
    }

    /**
     * Logs the user in.
     */
    login() {
        return new Promise((resolve, reject) => {
            let timeoutInt = setTimeout(()=>reject("Login timeout"), GLOB_CONFIG.opTimeout);

            // Reject and ensure to clear timeout
            this.socket.once('auth-error', (err) => {
                clearTimeout(timeoutInt);
                reject(err);
            });

            // Auth success.
            this.socket.once('auth-complete', async (userId, sessionId) => {
                clearTimeout(timeoutInt); // Clear timeout
                this.state.user.id = userId;
                this.state.sessionId = sessionId;

                // Wait for user object if its not there
                let memberIdx = this.state.members.find(x => x.session_id == sessionId);

                // If there is no member object for the client user, we must wait and fetch it.
                if(memberIdx == -1) {
                    // Wait for official join and user object
                    let joinTOp = setTimeout(()=>reject("Client member acquisition timeout"), GLOB_CONFIG.opTimeout);

                    this.socket.once('user-join', /** @param {import('../types/member').ChatMember} member */ async (member) => {
                        if(member.session_id == sessionId) {
                            clearTimeout(joinTOp);
                            this.#registerEvents();
                            await this.#preReady();
                            this.emit('ready');
                            resolve();
                            return;
                        }
                    });

                } else { // We are ready
                    this.#registerEvents();
                    await this.#preReady();
                    this.emit('ready');
                    resolve();
                }
            });
            
            // Perform the auth
            this.socket.emit('auth', { user: this.state.user.username });
        });
    }
}

export {
    MRClient,
    GLOB_CONFIG
}