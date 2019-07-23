const Driver = require("./driver");
const driver = new Driver();

module.exports = {
    name: "emvicify-socket.io",
    description: "Websockets implementation using Socket.IO",
    version: "0.0.1",
    events: {
        configureAppBeforeServe({app, http, modules}) {
            modules.drivers[driver.type] = driver;
        }
    }
};