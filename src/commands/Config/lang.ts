import { Message } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';
import Language from '../../structures/Language';

export default class LanguageCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'lang',
            aliases: ['setlang', 'language', 'setlanguage'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            botChannelPermissions: ['ADD_REACTIONS'],
            cooldown: 10,
            category
        });
    }

    async run(message: Message): Promise<Message | void> {

        const msg = await message.channel.send(this.lang.get('langs', this.client.languages.map((l) => `- ${l.flag} **${l.nativeName}** (\`${l.code}\`)`).join('\n')));
        this.client.languages.forEach(l => msg.react(l.flag));
        try {
            const collected = await msg.awaitReactions((r, u) => (u.id === message.author.id) && (this.client.languages.map(l => l.flag).includes(r.emoji.name)), {
                max: 1,
                time: 30e3,
                errors: ['time']
            });
            const emoji = collected.first()!.emoji;
            this.server!.language = this.client.languages.find(l => l.flag === emoji.name)!.code;
            this.server!.save();
            this.lang = this.client.languages.get(this.server!.language) as Language;
            if(msg.deletable) msg.delete().catch(() => { void 0 });
            message.channel.send(this.lang.get('langsSet'));
        } catch {
            return message.channel.send(this.lang.getError('rrTime'));
        }
        /*if (!args[0]) return message.channel.send(this.lang.get('langs', this.server!.prefix, this.client.languages.map((l) => `- ${l.flag} **${l.nativeName}** (\`${l.code}\`)`).join('\n'))
            .setColor(this.client.color));
        if (!this.client.languages.map((l) => l.code).includes(args[0].toLowerCase())) return this.sendError(message, this.lang.getError('langNo'), 0);
        this.server!.language = args[0];
        await this.server!.save();
        await message.react('830079699803701259');
        */
    }
}