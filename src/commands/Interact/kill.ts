import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class KillCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'kill',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message): Promise<Message> {
        let mention = message.mentions.users.first()
        if(!mention) return message.channel.send(this.lang.getError('killNoMention'))
        if(mention.id == this.client.user!.id) return message.channel.send(this.lang.getError('killMentionMe'))
        if(mention.id == message.author.id) return message.channel.send(this.lang.getError('killMentionAuthor'))
        return message.channel.send(new MessageEmbed()
        .setDescription(this.lang.get('kill', message.author, mention))
        .setImage(await this.client.getImage('sfw/gif/kill'))
        .setColor('RANDOM')
        .setFooter('Karu API ❤️'))
    }
}