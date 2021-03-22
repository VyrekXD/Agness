import { Message, GuildMember } from 'discord.js';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class EmitCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'emit',
            aliases: ['test'],
            memberChannelPermissions: ['ADMINISTRATOR'],
            usageArgs: ['[welcome/leave]'],
            example: (p) => `${p}emit welcome`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        switch (args[0].toLowerCase() ?? '') {
            case 'leave': {
                this.client.emit('guildMemberRemove', message.member as GuildMember);
                return message.channel.send(this.lang.get('emitEvent', 'leave'));
            }
            case 'welcome': {
                this.client.emit('guildMemberAdd', message.member as GuildMember);
                return message.channel.send(this.lang.get('emitEvent', 'welcome'));
            }
            default:
                return this.sendError(message, this.lang.getError('emitNoEvent'), 0);
        }
    }
}