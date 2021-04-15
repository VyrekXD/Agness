import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { ReactionRoles } from '../../database/reaction';
import { Welcomes } from '../../database/welcome';
import { Servers } from '../../database/server';
import { Leaves } from '../../database/leave';
import { Embeds } from '../../database/embed';
import { Tags } from '../../database/tags';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class GuildDeleteEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildDelete'
        });
    }

    async run(guild: Guild): Promise<void> {
        if(!guild.name) return;
        await ReactionRoles.deleteMany({ guildID: guild.id }).catch(() => void 0);
        await Welcomes.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Servers.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Leaves.findOneAndDelete({ guildID: guild.id }).catch(() => void 0);
        await Embeds.deleteMany({ guildID: guild.id }).catch(() => void 0);
        await Tags.deleteMany({ guildID: guild.id }).catch(() => void 0);
        const guilds = (await this.client.shard!.fetchClientValues('guilds.cache.size')).reduce((acc, guildCount) => acc + guildCount, 0);
        const channel = await this.client.channels.fetch(process.env.SERVERS_CHANNEL) as TextChannel;
        const owner = await this.client.users.fetch(guild.ownerID).catch(() => null);
        if (channel)
            channel.send(new MessageEmbed()
                .setAuthor('Server Remove', this.client.user!.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Name**: ${guild.name}\n**Members**: ${guild.memberCount}\n**Owner**: ${owner ? `${owner.tag} | ${owner.id}` : guild.ownerID}`)
                .setThumbnail(guild.iconURL({ dynamic: true })!)
                .setFooter(`Servers count: ${guilds}`)
                .setColor('RED')
                .setTimestamp());
    }
}