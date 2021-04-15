import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';
import fetch from 'node-fetch';

export default class BunnyCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'bunny',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const randomDog = await fetch('https://api.bunnies.io/v2/loop/random/?media=gif,png');

        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('bunny'))
        .setImage((await randomDog.json()).media.gif)
        .setColor('RANDOM'));
    }
}