import Language from '../structures/Language';
import Agness from '../bot';

export default class Spanish extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'es',
            displayName: 'Spanish',
            strings: {
                commands: {
                    help: 'Este es el comando help. Nada para mostrar por ahora.'
                }
            }
        });
    }
}