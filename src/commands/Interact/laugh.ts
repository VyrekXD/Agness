import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class laughCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'laugh',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('laugh', message.author))
        .setImage(await this.client.getImage('sfw/gif/laugh'))
        .setColor('RANDOM')
        .setFooter('Karu API ❤️'))
    }
}