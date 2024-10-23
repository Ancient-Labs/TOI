//import libs
import * as path from "node:path";
import * as dotenv from "dotenv";
import process from "node:process";

const __dirname:string = import.meta.dirname ? import.meta.dirname : "";

dotenv.config({
    path : path.resolve(__dirname, '.env')
});

interface ENV
{
    PORT                : number | undefined;
    JWT_TOKEN           : string | undefined;
    DB_CONNECT_STRING   : string | undefined;
    APP_NAME            : string | undefined;
}

interface Config
{
    PORT                : number;
    JWT_TOKEN           : string;
    DB_CONNECT_STRING   : string;
    APP_NAME            : string;
};

const getConfig = ():ENV => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        JWT_TOKEN: process.env.JWT_TOKEN,
        DB_CONNECT_STRING: process.env.DB_CONNECT_STRING,
        APP_NAME: process.env.APP_NAME,
    }
}

const getSanitizedConfig = (config:ENV): Config => {
    for (const [key, value] of Object.entries(config))
    {
        console.log(__dirname)
        if (value === undefined) throw new Error(`[Error] - Config : Missing key ${key} in .env config file`)
    }
    return config as Config
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;