import * as express from "express";
import * as http from "http";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

//require config
import config from "./config/config";

let app:express.Application = express();
let server = http.createServer(app);

app.use(bodyParser.urlencoded({limit:"5mb", extended:true, parameterLimit:50}));
app.use(bodyParser.json({limit:"5mb"}));

app.use(cookieParser());

server.listen(config.PORT, ():void => {
  console.log(`[Info] : App listening on PORT=${config.PORT}`)
});
