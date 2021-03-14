import Language from '../structures/Language';
import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import Agness from '../bot';

export default class Languages extends Collection<string, Language> {
    // eslint-disable-next-line no-unused-vars
    constructor(public client: Agness) {
        super();
    }

    async load(): Promise<void> {
        const folder = join(__dirname, '../languages/');
        const languages = readdirSync(folder).filter(x => x.endsWith('.js'));
        for (const language of languages) {
            const languageFile = await import(join(folder, language));
            const languageClass: Language = new languageFile.default(this.client);
            this.set(languageClass.code, languageClass);
        }
    }

    get(name?: string): Language | undefined {
        if (!name) return undefined;
        return this.find((c) => c.code === name);
    }
}