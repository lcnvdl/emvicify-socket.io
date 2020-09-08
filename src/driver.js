const { drivers } = require("@emvicify/base")
const WebSocketsDriver = drivers.websockets;

// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

const Server = require('socket.io');

class Driver extends WebSocketsDriver {
    constructor() {
        super();
        this.port = null;
        this.expressApp = null;
        this.httpServer = null;
        this.isRunning = false;
        this.__server = null;
    }

    get info() {
        return {
            type: this.type,
            version: "0.0.1",
            name: "emvicify-socket.io",
            description: "Websockets implementation using Socket.IO"
        }
    }

    listen(port, opts) {
        const io = new Server(port || this.port || this.httpServer, opts);

        io.on('connection', (socket) => {
            const connection = this.createConnection(socket);

            this.events.emit(this.socketEvent.Connect, connection);

            socket.on("message", data => {
                this.events.emit(this.socketEvent.Message, connection, data);
            });

            socket.on("disconnect", () => {
                this.events.emit(this.socketEvent.Disconnect, connection);
            });
        });

        this.__server = io;
        this.isRunning = true;
    }
}

module.exports = Driver;