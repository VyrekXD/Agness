/* eslint-disable no-unused-vars */
import { Collection, Message, GuildChannel, GuildMember } from 'discord.js';
import Agness from '../bot';

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
    client: Agness;
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

    constructor(client: Agness, options: CommandOptions) {
        this.client = client;
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
        this.enabled = typeof options.enabled === 'boolean' ? options.enabled : true;
        this.guildOnly = typeof options.guildOnly === 'boolean' ? options.guildOnly : this.category !== 'General';
        this.nsfwOnly = typeof options.nsfwOnly === 'boolean' ? options.nsfwOnly : false;
        this.devsOnly = typeof options.devsOnly === 'boolean' ? options.devsOnly : false;
    }

    // eslint-disable-next-line
    async run(...args: any[]): Promise<any> { }

    async canRun(message: Message): Promise<boolean> {
        if (message.guild && !(message.channel as GuildChannel).permissionsFor(message.guild.me as GuildMember).has('SEND_MESSAGES')) return false;
        return true;
    }
}