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
        const server = await Welcomes.findOne({ guildID: member.guild.id })
        if (!server) return;
        if (!member.user.bot && server.autorole.user)
            try {
                const rol = member.guild.roles.resolve(server.autorole.user);
                if (rol && rol.editable)
                    member.roles.add(rol.id);
            } catch { }
        if (member.user.bot && server.autorole.bot)
            try {
                const rol = member.guild.roles.resolve(server.autorole.bot);
                if (rol && rol.editable)
                    member.roles.add(rol.id);
            } catch { }
        const channel = member.guild.channels.resolve(server.channelID);
        if (!channel) return;
        let embed;
        const embed_DB = await Embeds.findOne({ guildID: member.guild.id, embed_name: server.embedName });
        let prefix = 'a?';
        const modelo = await Servers.findOne({ guildID: member.guild.id });
        prefix = modelo ? modelo.prefix : 'a?';
        const replaceText = (text: string) => this.client.replaceText(text, { channel: channel as TextChannel, member, prefix });
        if (embed_DB)
            embed = await this.client.generateEmbed(embed_DB, replaceText);
        if (!server.message && !embed) return;
        try {
            (channel as TextChannel).send(await replaceText(server.message), { embed });
        } catch { }
    }
}