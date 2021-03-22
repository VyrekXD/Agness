import { Message, MessageAttachment, TextChannel } from 'discord.js';
import { Servers } from '../../database/server';
import { Embeds } from '../../database/embed';
import { Tags } from '../../database/tags';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class MessageEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'message'
        });
    }

    async run(message: Message): Promise<void> {
        if (!message.author || message.author.bot) return;

        let server = await Servers.findOne({ guildID: message.guild?.id });
        if (!server && message.guild) {
            server = new Servers({ guildID: message.guild?.id });
            await server.save();
        }

        const prefix = server?.prefix ?? process.env.BOT_PREFIX;
        const prefixes = [prefix, `<@${this.client.user!.id}>`, `<@!${this.client.user!.id}>`];
        const usedPrefix = prefixes.find((p) => message.content.startsWith(p));
        if (!usedPrefix) return;
        if (usedPrefix != prefix)
            message.mentions.users.delete(message.mentions.users.first()!.id);

        const args = message.content.slice(usedPrefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();

        if (await this.isTag(message, command ?? '', server!.prefix)) return;

        const cmd = this.client.commands.get(command);

        try {
            if (!cmd) return;
            cmd.prepare({ server });
            if (!(await cmd.canRun(message))) return;
            await cmd.run(message, args);
        } catch (e) {
            console.log(e.stack ?? e);
            message.channel.send(`An unexpected error has occurred, here's a small reference: ${e.message ?? e}`);
        }
    }

    async isTag(message: Message, name: string, prefix: string): Promise<boolean> {
        if (!message.guild) return false;
        const tag = await Tags.findOne({
            guildID: message.guild.id,
            name
        });
        if (!tag) return false;
        const embedData = await Embeds.findOne({
            guildID: message.guild.id,
            name: tag.embedName
        });
        const replaceText = (text: string) => this.client.replaceText(text, {
            channel: message.channel as TextChannel,
            member: message.member!,
            prefix
        });
        let embed;
        if (embedData)
            embed = this.client.generateEmbed(embedData, replaceText);
        const files = tag.image ? [new MessageAttachment(tag.image, 'image.png')] : [];
        tag.addRoleID.forEach((roleID) => {
            const role = message.guild!.roles.resolve(roleID);
            if (!role || !role.editable || !message.guild!.me!.permissions.has('MANAGE_ROLES')) return;
            message.member!.roles.add(roleID).catch(() => void 0);
        });
        tag.removeRoleID.forEach((roleID) => {
            const role = message.guild!.roles.resolve(roleID);
            if (!role || !role.editable || !message.guild!.me!.permissions.has('MANAGE_ROLES')) return;
            message.member!.roles.remove(roleID).catch(() => void 0);
        });
        if (!tag.message && !embed && !files) return false;
        message.channel.send(replaceText(tag.message), { files, embed });
        return true;
    }
}