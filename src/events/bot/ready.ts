import Event from '../../structures/Event';
import Agness from '../../bot';

export default class ReadyEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'ready'
        });
    }

    async run(): Promise<void> {
        console.log('Bot ready!');
    }
}