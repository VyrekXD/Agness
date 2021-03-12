import Command from '../../structures/Command';
import { Message } from 'discord.js';
import { basename } from 'path';
import Agness from '../../bot';

export default class PingCommand extends Command {
    constructor(client: Agness) {
        super(client, {
            name: 'ping',
            category: basename(__dirname)
        });
    }

    async run(message: Message): Promise<void> {
        message.channel.send(`Pong! ${this.client.ws.ping}ms.`);
    }
}