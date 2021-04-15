import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class SlapCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'slap',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        let mention = message.mentions.users.first()
        if(!mention) return message.channel.send(this.lang.getError('slapNoMention'))
        if(mention.id == this.client.user!.id) return message.channel.send(this.lang.getError('slapMentionMe'))
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('slapMentionAuthor'))
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('slap', message.author, mention))
        .setImage((await this.client.nekos.sfw.slap()).url)
        .setColor('RANDOM')
        .setFooter('Nekos Life ❤️'))
    }
}