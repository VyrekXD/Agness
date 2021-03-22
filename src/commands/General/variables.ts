import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class VariablesCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'variables',
            aliases: ['vars'],
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(this.lang.get('variables')
        .setColor(this.client.color));
    }
}