import express from "npm:express";
import * as http from "node:http";

import bodyParser from "npm:body-parser";
import cookieParser from "npm:cookie-parser";

//require config
import config from "./config/config.ts";
import log from "./log.ts";

let app:express.Application = express();
let server = http.createServer(app);

app.use(bodyParser.urlencoded({limit:"5mb", extended:true, parameterLimit:50}));
app.use(bodyParser.json({limit:"5mb"}));

app.use(cookieParser());

server.listen(config.PORT, ():void => {
  log(`App listening on PORT=${config.PORT}`, 3)
});
