declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            BOT_PREFIX: string;
            MONGO_URL: string;
            KARU_TOKEN: string;
            DEVS: string;
            SERVERS_CHANNEL: string;
            CONNECT: string;
            DBLKEY: string;
        }
    }
}
export { };