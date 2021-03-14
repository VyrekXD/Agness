import Language from '../structures/Language';
import Agness from '../bot';

export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            displayName: 'English',
            strings: {
                commands: {
                    help: 'This is the help command. Nothing to show right now.'
                }
            }
        });
    }
}