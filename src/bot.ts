import Events from './managers/Events';
import { Client } from 'discord.js';
import { config } from 'dotenv';
config();

export default class Agness extends Client {
    events = new Events(this);
    color = '#637cf6';

    constructor() {
        super({
            partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
            intents: 5635
        });

        this.events.load();

        this.login(process.env.TOKEN);
    }
}

new Agness();