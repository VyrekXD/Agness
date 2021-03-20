import Event from '../../structures/Event';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class MessageUpdateEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'messageUpdate'
        });
    }

    async run(oldMessage: Message, newMessage: Message): Promise<void> {
        if (oldMessage.content === newMessage.content) return;
        this.client.emit('message', newMessage);
    }
}