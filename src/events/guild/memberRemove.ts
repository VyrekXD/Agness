import { GuildMember, TextChannel } from 'discord.js';
import { Servers } from '../../database/server';
import { Embeds } from '../../database/embed';
import { Leaves } from '../../database/leave';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class MemberRemoveEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildMemberRemove'
        });
    }

    async run(member: GuildMember): Promise<void> {
        const leave = await Leaves.findOne({ guildID: member.guild.id });
        if (!leave) return;
        const channel = member.guild.channels.resolve(leave.channelID);
        if (!channel) return;

        let embed;
        const embedData = await Embeds.findOne({
            guildID: member.guild.id,
            name: leave.embedName
        });
        let server = await Servers.findOne({ guildID: member.guild.id });
        if (!server)
            server = await Servers.create({
                guildID: member.guild.id
            });

        const replaceText = (text: string) =>
            this.client.replaceText(text, {
                channel: channel as TextChannel,
                prefix: server!.prefix,
                member
            });
        if (embedData)
            embed = this.client.generateEmbed(embedData, replaceText);
        if (!leave.message && !embed) return;
        (channel as TextChannel).send(replaceText(leave.message), { embed }).catch(() => void 0);
    }
}