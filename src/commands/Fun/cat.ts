import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';
import fetch from 'node-fetch';

export default class CatCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'cat',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const randomDog = await fetch('https://aws.random.cat/meow');

        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('cat'))
        .setImage((await randomDog.json()).file)
        .setColor('RANDOM'));
    }
}