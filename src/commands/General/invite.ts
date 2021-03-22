import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class InviteCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'invite',
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(this.lang.get('invite')
            .setColor(this.client.color)
            .setTimestamp());
    }
}