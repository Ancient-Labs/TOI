import "jsr:@std/dotenv/load";

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
        PORT: Deno.env.get('PORT') ? Number(Deno.env.get('PORT')) : undefined,
        JWT_TOKEN: Deno.env.get('JWT_TOKEN'),
        DB_CONNECT_STRING: Deno.env.get('DB_CONNECT_STRING'),
        APP_NAME: Deno.env.get('APP_NAME'),
    }
}

const getSanitizedConfig = (config:ENV): Config => {
    for (const [key, value] of Object.entries(config))
    {
        if (value === undefined) throw new Error(`[Error] - Config : Missing key ${key} in .env config file`)
    }
    return config as Config
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;