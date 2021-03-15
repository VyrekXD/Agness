import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
import Agness from '../../bot';

export default class HelpCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'help',
            category
        });
    }

    async run(message: Message, args: string[]): Promise<void | Message> {
        if (!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('help', this.server?.prefix as string))
                .setColor(this.client.color)
            );
        }
        const category = this.client.commands.filter((x) => x.category.toLowerCase() == args[0].toLowerCase()).array();
        const cmd = this.client.commands.get(args[0].toLowerCase());
        if (category.length)
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('helpCategory', this.server?.prefix as string, args[0].toLowerCase()))
                .setColor(this.client.color));
        else if (cmd)
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('helpCommand', this.server?.prefix as string, args[0].toLowerCase()))
                .setColor(this.client.color));
        else
            return message.channel.send(this.lang.get('helpNo'), new MessageEmbed()
                .setDescription(this.lang.get('help', this.server?.prefix as string))
                .setColor(this.client.color));
    }
}