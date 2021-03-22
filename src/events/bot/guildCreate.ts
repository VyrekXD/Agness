import { Guild, TextChannel, MessageEmbed } from 'discord.js';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class GuildCreateEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildCreate'
        });
    }

    async run(guild: Guild): Promise<void> {
        const guilds = (await this.client.shard!.fetchClientValues('guilds.cache.size')).reduce((acc, guildCount) => acc + guildCount, 0);
        const channel = await this.client.channels.fetch(process.env.SERVERS_CHANNEL) as TextChannel;
        const owner = await this.client.users.fetch(guild.ownerID).catch(() => null);
        if (channel)
            channel.send(new MessageEmbed()
                .setAuthor('New Server', this.client.user!.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Name**: ${guild.name}\n**Members**: ${guild.memberCount}\n**Owner**: ${owner ? `${owner.tag} | ${owner.id}` : guild.ownerID}`)
                .setThumbnail(guild.iconURL({ dynamic: true })!)
                .setFooter(`Servers count: ${guilds}`)
                .setColor(this.client.color)
                .setTimestamp());
    }
}