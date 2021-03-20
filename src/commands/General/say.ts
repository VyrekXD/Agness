import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class SayCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'say',
            aliases: ['decir'],
            example: (p) => `${p}say Hi! ❤️`,
            usageArgs: ['[Text]'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        if (message.deletable) await message.delete();
        if (!args[0]) return this.sendError(message, this.lang.getError('sayNoText'), 0);
        if ((message.content.match(/@(everyone|here)/gi) ||
            message.content.match(/<@&(\d{17,19})>/gi)) &&
            !message.member?.permissions.has('MENTION_EVERYONE'))
            return message.channel.send(this.lang.getError('sayNoPerms'));
        return message.channel.send(args.join(' '));
    }
}