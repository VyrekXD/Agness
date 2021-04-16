import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class FemdomCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'femdom',
            botChannelPermissions: ['EMBED_LINKS'],
            nsfwOnly: true,
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('nsfw'))
        .setImage(await this.client.getImage('nsfw/img/femdom'))
        .setColor('RANDOM')
        .setFooter(`${this.lang.get('nsfwRequest', message.author)} | Karu API ❤️️`));
    }
}