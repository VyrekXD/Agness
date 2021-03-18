/* eslint-disable no-unused-vars */
import { Collection, PermissionString } from 'discord.js';
import Agness from '../bot';
import Command from './Command';

interface CommandStrings {
    help(prefix: string): string;
    helpCategory(prefix: string, commands: Collection<string, Command>, commandsString: string): string;
    helpCommand(prefix: string, command: Command): string;
    helpNo(): string;
    prefixOK(newPrefix: string): string;
    langTitle(): string;
    langDescription(prefix: string): string;
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
    langNo(prefix: string): string;
}

interface CommandDescriptionStrings {
    help: string;
    ping: string;
    eval: string;
    prefix: string;
}

interface LanguageStrings {
    commands: CommandStrings;
    commandErrors: CommandErrorStrings;
    permissions: Record<PermissionString, string>;
    commandDescriptions: CommandDescriptionStrings;
}

interface LanguageOptions {
    code: string;
    nativeName: string;
    flag: string;
    strings: LanguageStrings;
}

export default class Language {
    code: string;
    nativeName: string;
    flag: string;
    strings: LanguageStrings;

    constructor(public client: Agness, options: LanguageOptions) {
        this.code = options.code;
        this.nativeName = options.nativeName;
        this.strings = options.strings;
        this.flag = options.flag
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
    getDescription(string: string): string {
        const value = (this.strings.commandDescriptions)[string as keyof CommandDescriptionStrings];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value;
    }
    parsePermission(permission: PermissionString): string {
        return this.strings.permissions[permission];
    }
}