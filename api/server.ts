import express from "npm:express";
import http from "node:http";

import bodyParser from "npm:body-parser";
import cookieParser from "npm:cookie-parser";

//require config
import config from "./config/config.ts";
import log from "./log.ts";

const app:express.Application = express();
const server:http.Server = http.createServer(app);

import './config/database.ts';

app.use(bodyParser.urlencoded({limit:"5mb", extended:true, parameterLimit:50}));
app.use(bodyParser.json({limit:"5mb"}));

app.use(cookieParser());

//import routes
import authRoutes from "./src/routes/auth.routes.ts";
import userRoutes from "./src/routes/user.routes.ts";

//Route init
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

server.listen(config.PORT, ():void => {
  log(`App listening on PORT=${config.PORT}`, 3)
});
