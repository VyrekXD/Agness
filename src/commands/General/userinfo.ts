import { Message } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class UserInfoCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'userinfo',
            aliases: ['ui', 'user'],
            usageArgs: ['<@User | ID>'],
            botChannelPermissions: ['EMBED_LINKS'],
            example: (p) => `${p}userinfo @Aviii.`,
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
        return message.channel.send(this.lang.get('userInfo', user, message.guild, message.author)
        .setColor(this.client.color)
        .setTimestamp());

    }
}