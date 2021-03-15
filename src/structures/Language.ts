/* eslint-disable no-unused-vars, max-lines */
import Agness from '../bot';

type functionString = (...args: string[]) => string;

interface CommandStrings {
    help: Function,
    category: Function,
    command: Function,
    noHelp: String,
}

interface LanguageStrings {
    commands: CommandStrings;
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

    get(string: keyof CommandStrings, ...args: string[]): string {
        const value = (this.strings.commands as unknown as Record<keyof CommandStrings, string | functionString>)[string];
        if (typeof value === 'function')
            return value(...args);
        else
            return value;
    }
}