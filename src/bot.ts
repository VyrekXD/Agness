import Commands from './managers/Commands';
import Events from './managers/Events';
import { Client } from 'discord.js';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

export default class Agness extends Client {
    commands = new Commands(this);
    events = new Events(this);
    color = '#637cf6';

    constructor() {
        super({
            partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
            intents: 5635
        });

        connect(process.env.MONGO_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) return console.log(`Mongo Error: ${err.stack || err}`);
            console.log('MongoDB ready!');
        });

        this.events.load();
        this.commands.load();

        this.login(process.env.TOKEN);
    }
}

new Agness();