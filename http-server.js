const express = require("express");
const http = require("http");
const app = express();

module.exports = client => {
  http.createServer(app).listen(8081);
};
