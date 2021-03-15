/* eslint-disable no-unused-vars */
import { PermissionString } from 'discord.js';
import Agness from '../bot';

interface CommandStrings {
    help(prefix: string): string;
    helpCategory(prefix: string, category: string): string;
    helpCommand(prefix: string, command: string): string;
    helpNo(): string;
}

interface LanguageStrings {
    commands: CommandStrings;
    permissions: Record<PermissionString, string>;
}

interface LanguageOptions {
    code: string;
    displayName: string;
    strings: LanguageStrings;
}

export default class Language {
    code: string;
    displayName: string;
    strings: LanguageStrings;

    constructor(public client: Agness, options: LanguageOptions) {
        this.code = options.code;
        this.displayName = options.displayName;
        this.strings = options.strings;
    }

    get<K extends keyof CommandStrings>(string: K, ...args: Parameters<CommandStrings[K]>): ReturnType<CommandStrings[K]> {
        const value = (this.strings.commands)[string];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value(...args);
    }

    parsePermission(permission: PermissionString): string {
        return this.strings.permissions[permission];
    }
}