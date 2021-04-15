import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class DisgustCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'disgust',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('disgust', message.author))
        .setImage(await this.client.getImage('sfw/gif/disgust'))
        .setColor('RANDOM')
        .setFooter('Karu API ❤️'))
    }
}