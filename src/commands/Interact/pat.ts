import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class PatCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'pat',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const mention = message.mentions.users.first();
        if(!mention) return message.channel.send(this.lang.getError('patNoMention'));
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('patMentionAuthor'));
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('pat', message.author, mention))
        .setImage((await this.client.nekos.sfw.pat()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'));
    }
}