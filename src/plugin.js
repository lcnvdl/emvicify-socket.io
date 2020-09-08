/**
 * @typedef {import("@emvicify/base/src/plugins/plugin")} Plugin
 * @typedef {import("@emvicify/base/src/plugins/plugin-type")} PluginType
 * @typedef {import("commander")} Program
 */

const { plugins } = require("@emvicify/base")
const fs = require("fs");
const path = require("path");

/** @type {Plugin} */
const Plugin = plugins.Plugin;

/** @type {PluginType} */
const PluginType = plugins.PluginType;

class SocketIOPlugin extends Plugin {
    constructor() {
        super();

        this.settings = {};
        this.driver = null;

        this.on("configureAppBeforeServe", args => this.configure(args));
        this.on("appStarted", args => this.listen(args));
        this.on("install", args => this.install(args));
        this.on("uninstall", args => this.uninstall(args));
        this.on("commands", (program, tools) => this.commands(program, tools));
    }

    get pluginId() {
        return "com.emvicify.socket-io";
    }

    get pluginName() {
        return "@emvicify/socket.io";
    }

    get pluginDescription() {
        return "Websockets implementation using Socket.IO";
    }

    get pluginType() {
        return PluginType.WebSocketsDriver;
    }

    get defaults() {
        return {
            port: null
        };
    }

    configure({ app, http, modules }) {
        this.settings = Object.assign(this.defaults, modules.settings.sockets);

        const Driver = require("./driver");

        this.driver = new Driver();
        this.driver.port = this.settings.port || driver.port;
        this.driver.expressApp = app;
        this.driver.httpServer = http;

        modules.drivers[driver.type] = driver;
    }

    listen() {
        this.driver.listen();
    }

    install({ baseDirectory }) {
        this._getAndEditSettings(baseDirectory, currentSettings => {
            if (!currentSettings.sockets) {
                currentSettings.sockets = this.defaults;
                return currentSettings;
            }
            else {
                return null;
            }
        });
    }

    uninstall({ baseDirectory, deleteSettings = false }) {
        if (deleteSettings) {
            this._getAndEditSettings(baseDirectory, currentSettings => {
                if (!currentSettings.sockets) {
                    currentSettings.sockets = this.defaults;
                    return currentSettings;
                }
                else {
                    return null;
                }
            });
        }
    }

    /**
     * @param {Program} program Program
     * @param {*} tools Tools
     */
    commands(program, tools) {
        const { version } = require("./commands/commands");
        const { consoleLog } = tools;

        program
            .command("socketio:version")
            .alias("socketio:v")
            .description("Plugin version")
            .action(() => version(consoleLog));
    }

    /**
     * @param {string} baseDirectory Base directory
     * @param {Function} action Function that receives the current settings (Object) and returns a new object if has changed, or null if it hasn't changed
     */
    _getAndEditSettings(baseDirectory, action) {
        const settingsPath = path.join(baseDirectory, "settings.json");
        let currentSettings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

        let newContent = action(currentSettings);

        if (newContent) {
            const content = JSON.stringify(newContent, null, 2);
            fs.writeFileSync(settingsPath, content, "utf-8");
        }
    }
}

module.exports = SocketIOPlugin;
