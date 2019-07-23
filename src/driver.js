const { drivers } = require("@emvicify/base")
const { WebSocketsDriver } = drivers;

class Driver extends WebSocketsDriver {
    constructor() {
        super();
        this.isRunning = false;
    }

    get info() {
        return {
            type: this.type,
            version: "0.0.1",
            name: "emvicify-socket.io",
            description: "Websockets implementation using Socket.IO"
        }
    }

    listen() {
    }
}

module.exports = Driver;