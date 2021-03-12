/* eslint-disable no-unused-vars */
import { Collection, Message, GuildMember, TextChannel, PermissionResolvable } from 'discord.js';
import Agness from '../bot';

const devs = process.env.DEVS ? process.env.DEVS.split(', ') : [];

export interface CommandOptions {
    name: string;
    category: string;
    aliases?: string[];
    description?: string;
    usage?(p: string): string;
    example?(p: string): string;
    botGuildPermissions?: string[];
    botChannelPermissions?: string[];
    memberGuildPermissions?: string[];
    memberChannelPermissions?: string[];
    cooldown?: number;
    enabled?: boolean;
    guildOnly?: boolean;
    nsfwOnly?: boolean;
    devsOnly?: boolean;
}

export default class Command {
    name: string;
    category: string;
    aliases: string[];
    description: string;
    usage: (p: string) => string;
    example: (p: string) => string;
    botGuildPermissions: string[];
    botChannelPermissions: string[];
    memberGuildPermissions: string[];
    memberChannelPermissions: string[];
    cooldown: number;
    enabled: boolean;
    guildOnly: boolean;
    nsfwOnly: boolean;
    devsOnly: boolean;
    cooldowns = new Collection();

    constructor(public client: Agness, options: CommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases || [];
        this.category = options.category || 'General';
        this.description = options.description || '';
        this.usage = options.usage || ((p) => `${p}${this.name}`);
        this.example = options.example || ((p) => `${p}${this.name}`);
        this.botGuildPermissions = options.botGuildPermissions || [];
        this.botChannelPermissions = options.botChannelPermissions || [];
        this.memberGuildPermissions = options.memberGuildPermissions || [];
        this.memberChannelPermissions = options.memberChannelPermissions || [];
        this.cooldown = options.cooldown || 2;
        this.enabled = !!options.enabled;
        this.guildOnly = typeof options.guildOnly === 'boolean' ? options.guildOnly : this.category !== 'General';
        this.nsfwOnly = !!options.nsfwOnly;
        this.devsOnly = !!options.devsOnly;
    }

    // eslint-disable-next-line
    async run(...args: any[]): Promise<any> { }

    canRun(message: Message): boolean {
        const channel = (message.channel as TextChannel);
        if (this.guildOnly && !message.guild) return !this.sendOrReply(message, 'This command is only available for servers.');
        if (message.guild && !channel.permissionsFor(message.guild.me as GuildMember).has('SEND_MESSAGES')) return false;
        if (this.checkCooldowns(message)) return !message.channel.send(`You have to wait **${Number(((this.cooldowns.get(message.author.id) as number) - Date.now()) / 1000).toFixed(2)}s** to execute this command.`);
        if (!this.enabled && !devs.includes(message.author.id)) return !this.sendOrReply(message, 'This command is under maintenance.');
        if (this.devsOnly && !devs.includes(message.author.id)) return !this.sendOrReply(message, 'This command can only be used by developers.');
        if (message.guild && !channel.nsfw && this.nsfwOnly) return !this.sendOrReply(message, 'This command can only be used on NSFW channels.');
        if (message.guild && this.memberGuildPermissions[0] && !this.memberGuildPermissions.some((p) => (message.member as GuildMember).permissions.has(p as PermissionResolvable)) && !devs.includes(message.author.id))
            return !this.sendOrReply(message, `You need the following permissions: \`${this.memberGuildPermissions.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.memberChannelPermissions[0] && !this.memberChannelPermissions.some((p) => channel.permissionsFor(message.member as GuildMember).has(p as PermissionResolvable)) && !devs.includes(message.author.id))
            return !this.sendOrReply(message, `You need the following permissions on this channel: \`${this.memberChannelPermissions.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.botGuildPermissions[0] && !this.botGuildPermissions.some((p) => (message.guild?.me as GuildMember).permissions.has(p as PermissionResolvable)))
            return !this.sendOrReply(message, `I need the following permissions: \`${this.botGuildPermissions.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.botChannelPermissions[0] && !this.botChannelPermissions.some((p) => channel.permissionsFor(message.guild?.me as GuildMember).has(p as PermissionResolvable)))
            return !this.sendOrReply(message, `I need the following permissions on this channel: \`${this.botChannelPermissions.map(this.parsePermission).join(', ')}\``);
        return true;
    }
    checkCooldowns(message: Message): boolean {
        if (this.cooldowns.has(message.author.id)) return true;
        this.cooldowns.set(message.author.id, Date.now() + (this.cooldown * 1000));
        setTimeout(() => {
            this.cooldowns.delete(message.author.id);
        }, this.cooldown * 1000);
        return false;
    }

    sendOrReply(message: Message, text: string): Promise<Message> {
        if (message.guild && !(message.channel as TextChannel).permissionsFor(message.guild.me as GuildMember).has('READ_MESSAGE_HISTORY'))
            return message.channel.send(text);
        return message.reply(text, { allowedMentions: { users: [] } });
    }

    parsePermission(permission: string): string {
        return permission.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }
}