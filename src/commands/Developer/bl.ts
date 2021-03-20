import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
import Agness from '../../bot';
import { Blacklists } from '../../database/blacklist';

export default class PingCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'bl',
            aliases: ['blacklist'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const embed = new MessageEmbed()
            .setColor(this.client.color)
        if (!args[0]) return message.channel.send(embed.setDescription(`You must give me a username.
**Correct Use:**
> ${this.server?.prefix}bl [@mention] <reason>`));
        const matchUser = args[0].match(/^<@!?(\d+)>$/);
        const user = matchUser ? await this.client.users.fetch(matchUser[1]).catch(() => null) : await this.client.users.fetch(args[0]).catch(() => null);
        if (!user) return message.channel.send(new MessageEmbed()
            .setDescription(`You have provided an invalid user.
**Correct Use:**
> ${this.server?.prefix}bl [@mention] <reason>`));
        let blacklist = await Blacklists.findOne({ userID: user.id });
        if (blacklist) {
            blacklist = await Blacklists.findOneAndDelete({ userID: user.id });
            return message.channel.send(embed.setDescription(`The user was successfully removed from the blacklist.
> **UserTag:** ${user.tag}
> **ID:** ${user.id}`));
        } else {
            if (!args[1]) return message.channel.send(embed.setDescription(`You must give me a username and reason.
        **Correct Use:**
> ${this.server?.prefix}bl [@mention] [reason]`));
            const fecha = new Date();
            blacklist = new Blacklists({ userID: user.id, reason: args.slice(1).join(' '), date: fecha });
            blacklist.save();
            return message.channel.send(embed.setDescription(`The user was successfully added from the blacklist.
> **UserTag:** ${user.tag}
> **ID:** ${user.id}
> **Reason:** ${args.slice(1).join(' ')}
> **Date:** ${fecha.toLocaleString()}`));
        }
    }
}