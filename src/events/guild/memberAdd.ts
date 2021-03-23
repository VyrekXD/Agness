import { GuildMember, TextChannel } from 'discord.js';
import { Welcomes } from '../../database/welcome';
import { Servers } from '../../database/server';
import { Embeds } from '../../database/embed';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class MemberAddEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildMemberAdd'
        });
    }

    async run(member: GuildMember): Promise<void> {
        const welcome = await Welcomes.findOne({ guildID: member.guild.id });
        if (!welcome) return;

        if (!member.user.bot && welcome.autorole.user) {
            const role = member.guild.roles.resolve(welcome.autorole.user);
            if (role && role.editable) member.roles.add(role.id).catch(() => void 0);
        }
        if (member.user.bot && welcome.autorole.bot) {
            const role = member.guild.roles.resolve(welcome.autorole.bot);
            if (role && role.editable) member.roles.add(role.id).catch(() => void 0);
        }

        const channel = member.guild.channels.resolve(welcome.channelID);
        if (!channel) return;

        let embed;
        const embedData = await Embeds.findOne({
            guildID: member.guild.id,
            name: welcome.embedName
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
        if (!welcome.message && !embed) return;
        (channel as TextChannel).send(replaceText(welcome.message), { embed }).catch(() => void 0);
    }
}