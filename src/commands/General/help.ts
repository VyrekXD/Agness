import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
import Agness from '../../bot';

export default class HelpCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'help',
            usageArgs: ['<Category | Command>'],
            example: (p) => `${p}help prefix`,
            botChannelPermissions: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        if (!args[0])
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('help', this.server?.prefix ?? process.env.BOT_PREFIX))
                .setColor(this.client.color));
        const category = this.client.commands.filter((c) => c.category.toLowerCase() == args[0].toLowerCase());
        const cmd = this.client.commands.get(args[0].toLowerCase());
        if (category.array().length)
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('helpCategory', this.server?.prefix ?? process.env.BOT_PREFIX, category.first()!.category,
                    Array(Math.ceil(category.array().length / 4))
                        .fill([]).map((_, i) => category.array().map((c) => c.name).slice(i * 4, (i * 4) + 4))
                        .map((l) => l.map((c) => c.padEnd(17, ' ')).join('').trim())
                        .join('\n'), category.size))
                .setColor(this.client.color));
        else if (cmd)
            return message.channel.send(new MessageEmbed()
                .setDescription(this.lang.get('helpCommand', this.server?.prefix ?? process.env.BOT_PREFIX, cmd))
                .setColor(this.client.color));
        else
            return message.channel.send(this.lang.getError('helpNo'), new MessageEmbed()
                .setDescription(this.lang.get('help', this.server?.prefix ?? process.env.BOT_PREFIX))
                .setColor(this.client.color));
    }
}