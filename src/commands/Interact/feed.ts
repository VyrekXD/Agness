import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class FeedCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'feed',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const mention = message.mentions.users.first();
        if(!mention) return message.channel.send(this.lang.getError('feedNoMention'));
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('feedMentionAuthor'));
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('feed', message.author, mention))
        .setImage((await this.client.nekos.sfw.kiss()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'));
    }
}