import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
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
        return message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get('voteDescription'))
            .setFooter(this.lang.get('voteFooter'))
            .setColor(this.client.color)
            .setTimestamp());
    }
}