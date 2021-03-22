declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            BOT_PREFIX: string;
            MONGO_URL: string;
            DEVS: string;
            SERVERS_CHANNEL: string;
        }
    }
}

export { };