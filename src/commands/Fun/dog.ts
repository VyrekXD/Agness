import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';
import fetch from 'node-fetch';

export default class DogCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'dog',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const randomDog = await fetch('https://dog.ceo/api/breeds/image/random');

        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('dog'))
        .setImage((await randomDog.json()).message)
        .setColor('RANDOM'));
    }
}