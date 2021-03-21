import { ReactionRoles } from '../../database/reaction';
import Event from '../../structures/Event';
import { GuildChannel } from 'discord.js';
import Agness from '../../bot';

export default class ChannelDeleteEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'ready'
        });
    }

    async run(channel: GuildChannel): Promise<void> {
        if (!channel) return;
        await ReactionRoles.deleteMany({
            guildID: channel.guild.id,
            channelID: channel.id
        });
    }
}