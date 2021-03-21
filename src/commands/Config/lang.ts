import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class LanguageCommand extends Command {
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

    async run(message: Message, args: string[]): Promise<Message | void> {
        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setTitle(this.lang.get('langTitle'))
            .setDescription(this.lang.get('langDescription', this.server!.prefix, this.client.languages.map((l) => `- ${l.flag} **${l.nativeName}** (\`${l.code}\`)`).join('\n')))
            .setColor(this.client.color)
        );
        if (!this.client.languages.map((l) => l.code).includes(args[0].toLowerCase())) return this.sendError(message, this.lang.getError('langNo'), 0);
        this.server!.language = args[0];
        await this.server!.save();
        await message.react('✅');
    }
}