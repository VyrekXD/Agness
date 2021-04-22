import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class VoteCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'vote',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(this.lang.get('vote')
            .setColor(this.client.color)
            .setTimestamp());
    }
}