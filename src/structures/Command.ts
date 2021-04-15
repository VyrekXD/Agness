/* eslint-disable no-unused-vars */
import { Collection, Message, TextChannel, PermissionString, MessageEmbed } from 'discord.js';
import { Blacklists } from '../database/blacklist';
import { Server } from '../database/server';
import English from '../languages/English';
import Language from './Language';  
import Agness from '../bot';

const devs = process.env.DEVS ? process.env.DEVS.split(', ') : [];

export type Category = 'Config' | 'Developer' | 'General';

interface CommandOptions {
    name: string;
    category: string;
    aliases?: string[];
    description?: string;
    usageArgs?: string[];
    example?(p: string): string;
    botGuildPermissions?: PermissionString[];
    botChannelPermissions?: PermissionString[];
    memberGuildPermissions?: PermissionString[];
    memberChannelPermissions?: PermissionString[];
    cooldown?: number;
    enabled?: boolean;
    guildOnly?: boolean;
    nsfwOnly?: boolean;
    devsOnly?: boolean;
}

export default abstract class Command {
    name: string;
    category: Category;
    aliases: string[];
    description: string;
    usageArgs: string[];
    example: (p: string) => string;
    botGuildPermissions: PermissionString[];
    botChannelPermissions: PermissionString[];
    memberGuildPermissions: PermissionString[];
    memberChannelPermissions: PermissionString[];
    cooldown: number;
    enabled: boolean;
    guildOnly: boolean;
    nsfwOnly: boolean;
    devsOnly: boolean;
    cooldowns = new Collection();
    server?: Server | null;
    lang: Language = new English(this.client);

    constructor(public client: Agness, options: CommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases ?? [];
        this.category = (options.category ?? 'General') as Category;
        this.description = options.description ?? '';
        this.usageArgs = options.usageArgs ?? [];
        this.example = options.example ?? ((p) => `${p}${this.name}`);
        this.botGuildPermissions = options.botGuildPermissions ?? [];
        this.botChannelPermissions = options.botChannelPermissions ?? [];
        this.memberGuildPermissions = options.memberGuildPermissions ?? [];
        this.memberChannelPermissions = options.memberChannelPermissions ?? [];
        this.cooldown = options.cooldown ?? 2;
        this.enabled = options.enabled ?? true;
        this.guildOnly = typeof options.guildOnly === 'boolean' ? options.guildOnly : this.category !== 'General';
        this.nsfwOnly = options.nsfwOnly ?? false;
        this.devsOnly = options.devsOnly ?? false;
    }

    usage(p: string): string {
        return `${p}${this.name} ${this.usageArgs.join(' ')}`.trim();
    }

    prepare({ server }: { server?: Server | null }): void {
        this.server = server;
        if (this.server)
            this.lang = this.client.languages.get(this.server.language) as Language;
    }

    // eslint-disable-next-line no-unused-vars
    abstract run(message: Message, args: string[]): Promise<Message | void>;

    async canRun(message: Message): Promise<boolean> {
        const channel = (message.channel as TextChannel);
        if (message.guild && !channel.permissionsFor(message.guild!.me!).has('SEND_MESSAGES')) return false;
        if (this.checkCooldowns(message) && !devs.includes(message.author.id))
            return !message.channel.send(this.lang.getError('cmdCooldown', Number(((this.cooldowns.get(message.author.id) as number) - Date.now()) / 1000).toFixed(2)));
        if (this.guildOnly && !message.guild) return !this.sendOrReply(message, this.lang.getError('cmdServer'));
        const blacklist = await Blacklists.findOne({ userID: message.author.id });
        if (blacklist) return !message.channel.send(new MessageEmbed()
            .setDescription(this.lang.getError('blacklist', blacklist.reason, blacklist.date.toLocaleString()))
            .setColor(this.client.color));
        if (!this.enabled && !devs.includes(message.author.id))
            return !this.sendOrReply(message, this.lang.getError('cmdEnabled'));
        if (this.devsOnly && !devs.includes(message.author.id))
            return !this.sendOrReply(message, this.lang.getError('cmdDevs'));
        if (message.guild && !channel.nsfw && this.nsfwOnly)
            return !this.sendOrReply(message, this.lang.getError('cmdNSFW'));
        if (message.guild && this.memberGuildPermissions[0] && !this.memberGuildPermissions.some((p) => message.member!.permissions.has(p)) && !devs.includes(message.author.id))
            return !this.sendOrReply(message, this.lang.getError('cmdMemberGuild', this.memberGuildPermissions.map(p => `+ ${this.lang.parsePermission(p)}`).join('\n')));
        if (message.guild && this.memberChannelPermissions[0] && !this.memberChannelPermissions.some((p) => channel.permissionsFor(message.member!).has(p)) && !devs.includes(message.author.id))
            return !this.sendOrReply(message, this.lang.getError('cmdMemberChannel', this.memberChannelPermissions.map(p => `+ ${this.lang.parsePermission(p)}`).join('\n')));
        if (message.guild && this.botGuildPermissions[0] && !this.botGuildPermissions.some((p) => message.guild!.me!.permissions.has(p)))
            return !this.sendOrReply(message, this.lang.getError('cmdBotGuild', this.botGuildPermissions.map(p => `+ ${this.lang.parsePermission(p)}`).join('\n')));
        if (message.guild && this.botChannelPermissions[0] && !this.botChannelPermissions.some((p) => channel.permissionsFor(message.guild!.me!).has(p)))
            return !this.sendOrReply(message, this.lang.getError('cmdBotChannel', this.botChannelPermissions.map(p => `+ ${this.lang.parsePermission(p)}`).join('\n')));
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
        if (message.guild && !(message.channel as TextChannel).permissionsFor(message.guild!.me!).has('READ_MESSAGE_HISTORY'))
            return message.channel.send(text);
        return message.reply(text, { allowedMentions: { users: [] } });
    }

    sendError(message: Message, text: string, arg: number): Promise<Message> {
        const values = [`> ${(this.server!.prefix ?? process.env.BOT_PREFIX) as string}${this.name}`, ...this.usageArgs];
        const characters = this.usageArgs[arg].replace(/[^a-z\s]/gi, '_').replace(/[a-z\s]/gi, '^').replace(/_/gi, ' ');
        return message.channel.send(`\`\`\`diff
- ${text}
${values.join(' ')}
- ${characters.padStart(values.slice(0, arg + 1).join(' ').length + characters.length - 1, ' ')}\`\`\``);
    }
}