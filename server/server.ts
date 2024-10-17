import * as express from "express";

let app:express.Application = express();

app.listen(5700, ():void => {
  console.log("App listen on 5700")
});
