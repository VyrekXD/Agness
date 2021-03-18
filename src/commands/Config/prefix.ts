import { Servers } from '../../database/server';
import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class PrefixCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'prefix',
            aliases: ['setprefix'],
            usageArgs: ['<New Prefix>'],
            example: (p) => `${p}prefix a-`,
            memberGuildPermissions: ['ADMINISTRATOR'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<void | Message> {
        if (!args[0]) return this.sendError(message, this.lang.getError('prefixArgs'), 0);
        if (args[0].length > 5) return this.sendError(message, this.lang.getError('prefixLength'), 0);
        let server = await Servers.findOne({ guildID: message.guild?.id });
        if (!server) server = new Servers({ guildID: message.guild?.id, prefix: args[0] });
        server.prefix = args[0];
        await server.save();
        return message.channel.send(this.lang.get('prefixOK', args[0]));
    }
}