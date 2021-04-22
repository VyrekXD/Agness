import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class AvatarCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'avatar',
            aliases: ['av', 'pfp', 'foto'],
            usageArgs: ['<@User | ID>'],
            botChannelPermissions: ['EMBED_LINKS'],
            example: (p) => `${p}avatar @Aviii.`,
            cooldown: 4,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const matchUser = args[0]?.match(/^<@!?(\d+)>$/)?.[1] ?? args[0];
        const user = message.mentions.users.first()
            ?? (await this.client.users.fetch(matchUser).catch(() => null))
            ?? this.client.users.cache.find((u) => (u.username.toLowerCase() === args.join(' ').toLowerCase()) ?? (u.username.toLowerCase() === args.join(' ').toLowerCase()))
            ?? message.guild?.members.cache.find((m) => m.nickname?.toLowerCase() === args.join(' ').toLowerCase())?.user
            ?? message.author;
        const extension = (user.avatar ?? '').startsWith('a_') ? 'gif' : 'png';
        const avatar = user.displayAvatarURL({ format: extension, size: 4096 });
        return message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get('avatar', user.username, avatar))
            .attachFiles([new MessageAttachment(avatar, `avatar.${extension}`)])
            .setImage(`attachment://avatar.${extension}`)
            .setColor(this.client.color));
    }
}