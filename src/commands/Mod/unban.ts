import Command from '../../structures/Command';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class UnBanCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'unban',
            botGuildPermissions: ['BAN_MEMBERS'],
            botChannelPermissions: ['BAN_MEMBERS'],
            usageArgs: ['[ID]', '<reason>'],
            example: (prefix) => `${prefix}unban 710880777662890095`,
            cooldown: 10,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        if (!args[0]) return this.sendError(message, this.lang.getError('unbanNoUser'), 0);
        const matchUser = args[0]!.match(/^<@!?(\d+)>$/)?.[1] || args[0];
        const user = (await this.client.users.fetch(matchUser).catch(() => null)) || message.mentions.users.first();
        if (!user) return this.sendError(message, this.lang.getError('unbanNoUser'), 0);
        const banUser = await message.guild!.fetchBan(user).catch(() => { null });
        if (!banUser) return message.channel.send(this.lang.getError('unbanUserNoBan'));
        try {
            message.guild!.members.unban(banUser.user, args.slice(1).join(' ') || undefined);
            message.channel.send(`<:right:830079699803701259> ${this.lang.get('unbanOK', banUser.user.tag)}`);
        } catch {
            message.channel.send(`<:error:829478128970629150> ${this.lang.getError('unBanNo', banUser.user.tag)}`);
        }
    }
}