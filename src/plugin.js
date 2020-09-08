const Driver = require("./driver");
const driver = new Driver();

module.exports = {
    name: "emvicify-socket.io",
    description: "Websockets implementation using Socket.IO",
    version: "0.0.1",
    events: {
        configureAppBeforeServe({ app, http, modules }) {
            const settings = modules.settings["socket-io"];

            if (settings) {
                driver.port = settings.port || driver.port;
            }

            driver.expressApp = app;
            driver.httpServer = http;
            modules.drivers[driver.type] = driver;
        },

        appStarted({ app, http, modules }) {
            driver.listen();
        }
    }
};