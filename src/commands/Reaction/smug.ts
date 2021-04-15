import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class SmugCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'smug',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('smug', message.author))
        .setImage(await this.client.getImage('sfw/gif/smug'))
        .setColor('RANDOM')
        .setFooter('Karu API ❤️'));
    }
}