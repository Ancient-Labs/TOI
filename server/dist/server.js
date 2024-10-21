"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let app = express();
let server = http.createServer(app);
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50 }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
server.listen(5700, () => {
    console.log("App listen on 5700");
});
