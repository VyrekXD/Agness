import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class HugCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'hug',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        let mention = message.mentions.users.first()
        if(!mention) return message.channel.send(this.lang.getError('hugNoMention'))
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('hugMentionAuthor'))
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('hug', message.author, mention))
        .setImage((await this.client.nekos.sfw.hug()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'))
    }
}