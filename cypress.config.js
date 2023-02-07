const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://d1mjdgbcz8qwkx.cloudfront.net/"
  }
});
