import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';
import fetch from 'node-fetch';

export default class DuckCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'duck',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const randomDog = await fetch('https://random-d.uk/api/v1/random?type=png');

        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('duck'))
        .setImage((await randomDog.json()).url)
        .setColor('RANDOM'));
    }
}