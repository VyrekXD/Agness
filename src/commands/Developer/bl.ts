import { Blacklists } from '../../database/blacklist';
import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class BlacklistCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'bl',
            aliases: ['blacklist'],
            usageArgs: ['[@User | User ID]', '[Reason]'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const embed = new MessageEmbed()
            .setColor(this.client.color);
        if (!args[0]) return message.channel.send(embed.setDescription(`You must give me a username.
**Correct Use:**
> ${this.server?.prefix}bl [@mention] <reason>`));
        const matchUser = args[0]?.match(/^<@!?(\d+)>$/)?.[1] ?? args[0];
        const user = await this.client.users.fetch(matchUser).catch(() => null);
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
            blacklist = new Blacklists({ userID: user.id, reason: args.slice(1).join(' '), date: new Date() });
            await blacklist.save();
            return message.channel.send(embed.setDescription(`The user was successfully added from the blacklist.
> **UserTag:** ${user.tag}
> **ID:** ${user.id}
> **Reason:** ${args.slice(1).join(' ')}
> **Date:** ${blacklist.date.toLocaleString()}`));
        }
    }
}