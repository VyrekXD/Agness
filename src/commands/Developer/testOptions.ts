import optionsManager from '../../Utils/optionsManager';
import { inspect } from 'util';
import { Message } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class testOptionsCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'testoptions',
            aliases: ['to'],
            usageArgs: ['<options-format>'],
            devsOnly: true,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const arr = optionsManager([
            {
                name: 'prueba1'
            },
            {
                name: 'prueba2',
                requireValue: true
            },
            {
                name: 'prueba3',
                requireValue: true,
                allowQuotes: true
            },
            {
                name: 'prueba4',
                requireValue: true,
                allowQuotes: true
            }
        ], args);
        message.channel.send(inspect(args), { code: 'js' });
        return message.channel.send(inspect(arr), { code: 'js' });
    }
}