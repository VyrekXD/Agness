/* eslint-disable no-unused-vars, max-lines */
import Agness from '../bot';

type functionString = (...args: string[]) => string;

interface LanguageStrings {
    commands: {
        help: string;
    }
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

    get(string: string, ...args: string[]): string {
        const value = (this.strings.commands as Record<string, string | functionString>)[string];
        if (typeof value === 'function')
            return value(...args);
        else
            return value;
    }
}