const expect = require("chai").expect;
const Driver = require("../src/driver");

describe("Driver", () => {
    describe("constructor", () => {
        it("should work fine", () => {
            const instance = new Driver();
            expect(instance).to.be.ok;
        });
    });

    describe("type", () => {
        it("should be sockets", () => {
            const instance = new Driver();
            expect(instance.type).to.equal("sockets");
        });
    });
});