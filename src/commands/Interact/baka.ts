import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class BakaCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'baka',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        const mention = message.mentions.users.first();
        if(!mention) return message.channel.send(this.lang.getError('bakaNoMention'));
        if(mention.id == this.client.user!.id) return message.channel.send(this.lang.getError('bakaMentionMe'));
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('bakaMentionAuthor'));
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('baka', message.author, mention))
        .setImage((await this.client.nekos.sfw.baka()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'));
    }
}