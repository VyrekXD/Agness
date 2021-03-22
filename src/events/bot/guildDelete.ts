import { ReactionRoles } from '../../database/reaction';
import { Welcomes } from '../../database/welcome';
import { Servers } from '../../database/server';
import { Leaves } from '../../database/leave';
import { Embeds } from '../../database/embed';
import { Tags } from '../../database/tags';
import Event from '../../structures/Event';
import { Guild } from 'discord.js';
import Agness from '../../bot';

export default class GuildDeleteEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildDelete'
        });
    }

    async run(guild: Guild): Promise<void> {
        await ReactionRoles.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Welcomes.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Servers.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Leaves.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Embeds.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Tags.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
    }
}