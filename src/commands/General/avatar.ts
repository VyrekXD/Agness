import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class AvatarCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'avatar',
            aliases: ['av', 'pfp', 'foto'],
            usageArgs: ['<@User | ID>'],
            example: (p) => `${p}avatar @Aviii.`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const user = message.mentions.users.first()
            || (await this.client.users.fetch(args[0]).catch(() => null))
            || this.client.users.cache.find((u) => (u.username.toLowerCase() === args.join(' ').toLowerCase()) || (u.username.toLowerCase() === args.join(' ').toLowerCase()))
            || message.guild?.members.cache.find((m) => m.nickname?.toLowerCase() === args.join(' ').toLowerCase())?.user
            || message.author;
        const extension = (user.avatar || '').startsWith('a_') ? 'gif' : 'png';
        const avatar = user.displayAvatarURL({ format: extension, size: 4096 });
        return message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get('avatar', user.username, avatar))
            .attachFiles([new MessageAttachment(avatar, `avatar.${extension}`)])
            .setImage(`attachment://avatar.${extension}`)
            .setColor(this.client.color));
    }
}