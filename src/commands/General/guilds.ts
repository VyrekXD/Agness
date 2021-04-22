import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class GuildsCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'guilds',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const results = await Promise.all([
            this.client.shard!.fetchClientValues('guilds.cache.size'),
            this.client.shard!.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
        ]);
        const totalGuilds = (results[0] as number[]).reduce((acc, guildCount) => acc + guildCount, 0);
        const totalMembers = (results[1] as number[]).reduce((acc, memberCount) => acc + memberCount, 0);
        const shardID = this.client.shard!.ids.map((i) => `${i}`).join(', ');
        return message.channel.send(this.lang.get('guilds', totalMembers, totalGuilds, shardID as string)
            .setColor(this.client.color));
    }
}