import { Servers } from '../../database/server';
import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
import Agness from '../../bot';

export default class PrefixCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'lang',
            aliases: ['setlang', 'language', 'setlanguage'],
            usageArgs: ['<New Language>'],
            example: (p) => `${p}lang es`,
            memberGuildPermissions: ['ADMINISTRATOR'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<void | Message> {
        const types = ['es', 'en'];
        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setTitle(this.lang.get('langTitle'))
            .setDescription(this.lang.get('langDescription', this.server?.prefix as string))
            .setColor(this.client.color)
        );
        if (!types.includes(args[0].toLowerCase())) return this.sendError(message, this.lang.getError('langNo', this.server?.prefix as string), 0);
        let server = await Servers.findOne({ guildID: message.guild?.id });
        if (!server) server = new Servers({ guildID: message.guild?.id, language: args[0].toLowerCase() });
        server.language = args[0];
        await server.save();
        await message.react('✅');
    }
}