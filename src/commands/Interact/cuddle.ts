import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class CuddleCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'cuddle',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        let mention = message.mentions.users.first()
        if(!mention) return message.channel.send(this.lang.getError('cuddleNoMention'))
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('cuddleMentionAuthor'))
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('cuddle', message.author, mention))
        .setImage((await this.client.nekos.sfw.cuddle()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'))
    }
}