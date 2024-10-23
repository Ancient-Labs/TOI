import * as express from "express";
import * as http from "http";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

let app:express.Application = express();
let server = http.createServer(app);

app.use(bodyParser.urlencoded({limit:"5mb", extended:true, parameterLimit:50}));
app.use(bodyParser.json({limit:"5mb"}));

app.use(cookieParser());

server.listen(5700, ():void => {
  console.log("App listen on 5700")
});
