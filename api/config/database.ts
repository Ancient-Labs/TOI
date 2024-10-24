import { connect } from "npm:mongoose";
import config from "./config.ts";
import log from "../log.ts";

connect(config.DB_CONNECT_STRING)
    .then(() => {
        log('MongoDB : Database connected !', 1)
    }).catch((err:string) => {
        log(err, 0);
    })

