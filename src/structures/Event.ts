/* eslint-disable no-unused-vars */
import { ClientEvents, Collection} from 'discord.js';
import English from '../languages/English';
import Language from './Language';  
import Agness from '../bot';

interface EventOptions {
    name: keyof ClientEvents;
}

export default abstract class Event {
    name: keyof ClientEvents;
    cooldowns = new Collection<string, { ratelimit: number, date: number }>();
    lang: Language = new English(this.client);
    constructor(public client: Agness, options: EventOptions) {
        this.name = options.name;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    abstract run(...args: any[]): Promise<any>;
    checkCooldowns(userID: string): boolean {
        const cooldown = this.cooldowns.get(userID);
        if (!this.cooldowns.has(userID)) {
            this.cooldowns.set(userID, {
                ratelimit: 1,
                date: Date.now() + 4 * 1000
            });
            return false;
        } else if (cooldown!.ratelimit < 2) {
            this.cooldowns.set(userID, {
                ratelimit: cooldown!.ratelimit + 1,
                date: Date.now() + 4 * 1000
            });
            return false;
        } else if (cooldown!.ratelimit == 2) {
            this.cooldowns.set(userID, {
                ratelimit: cooldown!.ratelimit + 1,
                date: Date.now() + 4 * 1000
            });
            setTimeout(() => {
                this.cooldowns.delete(userID);
            }, 4 * 1000);
            return false;
        } else {
            return true;
        }
    }
}