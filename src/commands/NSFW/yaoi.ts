import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class YaoiCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'yaoi',
            botChannelPermissions: ['EMBED_LINKS'],
            nsfwOnly: true,
            category
        });
    }

    async run(message: Message): Promise<Message> {
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('nsfw'))
        .setImage(await this.client.getImage('nsfw/img/yaoi'))
        .setColor('RANDOM')
        .setFooter(`${this.lang.get('nsfwRequest', message.author)} | Karu API ❤️`));
    }
}