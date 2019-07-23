const expect = require("chai").expect;

describe("Plugin", () => {
    describe("require", () => {
        it("should work fine", () => {
            const Plugin = require("../src/plugin");
            expect(Plugin).to.be.ok;
        });
    });
});