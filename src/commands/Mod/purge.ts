import Command from '../../structures/Command';
import { Message, TextChannel } from 'discord.js';
import Agness from '../../bot';

export default class PurgeCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'purge',
            aliases: ['clear'],
            botChannelPermissions: ['MANAGE_MESSAGES'],
            memberChannelPermissions: ['MANAGE_MESSAGES'],
            example: (prefix) => `\n${prefix}purge 20\n${prefix}purge user 20 @Aviii @Andremor`,
            usageArgs: ['[amount | bots | user | embed | attachment]', '<amount>', '<users>'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        const types = ['embeds', 'embed', 'attachments', 'att', 'attachment', 'users', 'user', 'bot', 'bots'];
        if (!args[0]) return message.channel.send(this.lang.getError('purgeNoArgs', this.server!.prefix)
        .setColor(this.client.color)
        .setTimestamp());
        if (
            (isNaN(args[0] as unknown as number) && !types.includes(args[0].toLocaleLowerCase())) ||
            (args[1] && isNaN(args[1] as unknown as number))
        ) return this.sendError(message, this.lang.getError('purgeNoNumber'), types.includes(args[0].toLocaleLowerCase()) ? 1 : 0);
        const number = isNaN(args[0] as unknown as number) ? parseInt(args[1]) : parseInt(args[0]);
        if (number < 0 || number > 100) return message.channel.send(this.lang.getError('purgeNoValid'));
        if (message.deletable) await message.delete();
        let messagesDelete;
        switch (args[0].toLocaleLowerCase()) {
            case 'embed':
            case 'embeds': {
                const messages = await message.channel.messages.fetch({
                    limit: 100
                });
                messages.sweep(m => !m.embeds[0]);
                const borrar = messages.keyArray().splice(0, number);
                messagesDelete = await (message.channel as TextChannel).bulkDelete(borrar, true);
                break;
            }
            case 'att':
            case 'attachments': {
                const messages = await message.channel.messages.fetch({
                    limit: 100
                });
                messages.sweep(m => !m.attachments.first());
                const borrar = messages.keyArray().splice(0, number);
                messagesDelete = await (message.channel as TextChannel).bulkDelete(borrar, true);
                break;
            }
            case 'user':
            case 'users': {
                if (!args[2]) return message.channel.send(this.lang.getError('purgeNoUsers'));
                const users = message.mentions.users.size ? message.mentions.users.keyArray() : args.slice(2);
                const messages = await message.channel.messages.fetch({
                    limit: 100
                });
                messages.sweep(m => !users.includes(m.author.id));
                const borrar = messages.keyArray().splice(0, number);
                messagesDelete = await (message.channel as TextChannel).bulkDelete(borrar, true);
                break;
            }
            case 'bot':
            case 'bots': {
                const messages = await message.channel.messages.fetch({
                    limit: 100
                });
                messages.sweep(m => !m.author.bot);
                const borrar = messages.keyArray().splice(0, number);
                messagesDelete = await (message.channel as TextChannel).bulkDelete(borrar, true);
                break;
            }
            default: {
                messagesDelete = await (message.channel as TextChannel).bulkDelete(number, true);
                break;
            }
        }
        if (!messagesDelete.size) return message.channel.send(this.lang.get('purgeNothing'));
        const m = await message.channel.send(this.lang.get('purge', messagesDelete.size));
        setTimeout(() => m.delete(), 5000);
    }
}