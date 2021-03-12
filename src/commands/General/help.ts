import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class PingCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'help',
            category
        });
    }

    async run(message: Message): Promise<void | Message> {
        
    }
}