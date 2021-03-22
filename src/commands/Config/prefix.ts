import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class PrefixCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'prefix',
            aliases: ['setprefix', 'customprefix'],
            usageArgs: ['<New Prefix>'],
            example: (p) => `${p}prefix a-`,
            memberGuildPermissions: ['ADMINISTRATOR'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        if (!args[0]) return this.sendError(message, this.lang.getError('prefixArgs'), 0);
        if (args[0].length > 5) return this.sendError(message, this.lang.getError('prefixLength'), 0);
        this.server!.prefix = args[0];
        await this.server!.save();
        return message.channel.send(this.lang.get('prefix', args[0]));
    }
}