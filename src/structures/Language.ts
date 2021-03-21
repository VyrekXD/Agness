/* eslint-disable no-unused-vars, max-lines */
import { PermissionString, MessageEmbed } from 'discord.js';
import Command, { Category } from './Command';
import Agness from '../bot';

interface CommandStrings {
    help(prefix: string, categories: number, commands: number): string;
    helpCategory(prefix: string, category: Category, commands: string, quantity: number): string;
    helpCommand(prefix: string, command: Command): string;
    prefix(prefix: string): string;
    langTitle(): string;
    langDescription(prefix: string, languages: string): string;
    guildsDescription(members: number, guilds: number): string;
    guildsFooter(shardID: string): string;
    voteDescription(): string;
    voteFooter(): string;
    avatar(user: string, avatar: string): string;
    rrHelp(prefix: string): MessageEmbed;
    rrReact(role: string): string;
    rr(role: string, emoji: string): string;
    rrNormal(): MessageEmbed;
    rrUnique(): MessageEmbed;
    rrOnly(): MessageEmbed;
    rrDelete(emoji: string): string;
}

interface CommandErrorStrings {
    cmdServer(): string;
    cmdCooldown(cooldown: string): string;
    cmdEnabled(): string;
    cmdDevs(): string;
    cmdNSFW(): string;
    cmdMemberGuild(perms: string): string;
    cmdMemberChannel(perms: string): string;
    cmdBotGuild(perms: string): string;
    cmdBotChannel(perms: string): string;
    prefixArgs(): string;
    prefixLength(): string;
    langNo(): string;
    helpNo(): string;
    sayNoText(): string;
    sayNoPerms(): string;
    blacklist(reason: string, date: string): string;
    rrNoOption(prefix: string): string;
    rrNoRole(): string;
    rrNoRoleAdd(): string;
    rrNoType(prefix: string): string;
    rrNoChannel(): string;
    rrNoChannelView(): string;
    rrNoChannelReactions(): string;
    rrNoMessage(): string;
    rrNoMessageFound(): string;
    rrErrorMessage(): string;
    rrNoEmoji(): string;
    rrExists(): string;
    rrTime(): string;
    rrDeleteNoEmoji(): string;
    rrDeleteNoMessage(): string;
    rrDeleteEmoji(): string;
    rrDeleteNo(): string;
}

interface CommandDescriptionStrings {
    help: string;
    ping: string;
    eval: string;
    prefix: string;
    guilds: string;
    say: string;
    avatar: string;
    vote: string;
    lang: string;
    bl: string;
    reactrole: string;
}

interface LanguageStrings {
    commands: CommandStrings;
    commandErrors: CommandErrorStrings;
    permissions: Record<PermissionString, string>;
    commandDescriptions: CommandDescriptionStrings;
}

interface LanguageOptions {
    code: string;
    flag: string;
    nativeName: string;
    strings: LanguageStrings;
}

export default class Language {
    code: string;
    flag: string;
    nativeName: string;
    strings: LanguageStrings;

    constructor(public client: Agness, options: LanguageOptions) {
        this.code = options.code;
        this.flag = options.flag;
        this.strings = options.strings;
        this.nativeName = options.nativeName;
    }

    get<K extends keyof CommandStrings>(string: K, ...args: Parameters<CommandStrings[K]>): ReturnType<CommandStrings[K]> {
        const value = (this.strings.commands)[string];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value(...args);
    }

    getError<K extends keyof CommandErrorStrings>(string: K, ...args: Parameters<CommandErrorStrings[K]>): ReturnType<CommandErrorStrings[K]> {
        const value = (this.strings.commandErrors)[string];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value(...args);
    }

    getDescription(string: string): string | undefined {
        const value = (this.strings.commandDescriptions)[string as keyof CommandDescriptionStrings];
        return value;
    }

    parsePermission(permission: PermissionString): string {
        return this.strings.permissions[permission];
    }
}