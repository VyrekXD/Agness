import Languages from './managers/Languages';
import Commands from './managers/Commands';
import Events from './managers/Events';
import { Client } from 'discord.js';
import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

export default class Agness extends Client {
    languages = new Languages(this);
    commands = new Commands(this);
    events = new Events(this);
    color = '#66e7ae';

    constructor() {
        super({
            partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
            intents: 5635
        });

        connect(process.env.MONGO_URL as string, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) return console.log(`Mongo Error: ${err.stack ?? err}`);
            console.log('MongoDB ready!');
        });

        this.languages.load();
        this.commands.load();
        this.events.load();

        this.login(process.env.TOKEN);
    }
}

new Agness();