import Command from '../../structures/Command';
import { Message, Util } from 'discord.js';
import Agness from '../../bot';

export default class BanCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'ban',
            aliases: ['prohibir'],
            botGuildPermissions: ['BAN_MEMBERS'],
            botChannelPermissions: ['BAN_MEMBERS'],
            usageArgs: ['[@mentions | IDs]', '<reason>'],
            example: (prefix) => `\n${prefix}ban @Aviii Beautifull.\n${prefix}ban @Aviii @Andremor @Watermelon`,
            cooldown: 10,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        if (!args[0]) return this.sendError(message, this.lang.getError('banNoArgs'), 0);
        const members = message.mentions.members?.filter(m => (m.bannable) && (m.id !== message.guild!.ownerID) && (m.roles.highest.comparePositionTo(message.member!.roles.highest) < 0)).array() || [];
        for (const IDs of args) {
            if (IDs.length > 19) continue;
            if (/^<@!?(\d+)>$/.test(IDs)) continue;
            if (isNaN(IDs as unknown as number)) continue;
            const user = message.guild!.members.cache.get(IDs) || await message.guild!.members.fetch(IDs).catch(() => { false });
            if (user) {
                if (user.bannable) {
                    if (!members.some(e => e.id === user.id)) {
                        if ((message.guild!.ownerID !== user.id) && (user.roles.highest.comparePositionTo(message.member!.roles.highest) < 0)) {
                            members.push(user);
                        }
                    } else continue;
                } else continue;
            } else continue;
        }
        if (members.length < 1) return message.channel.send(this.lang.getError('banNoUsers'));
        if (members.length > 20) return message.channel.send(this.lang.getError('banUsersMax'));
        const ban: string[] = [];
        let msg: Message | void = await message.channel.send(this.lang.get('Waiting'));
        for(const member of members) {
            try { 
                await member.ban({ reason: (members.length === 1) ? args.slice(1).join('') ? args.slice(1).join('') : undefined : undefined });
                ban.push(`<:right:830079699803701259> **${member.user.tag}** ${this.lang.get('banCheck')}`);
                msg = await (msg as Message).edit(ban.join('\n')).catch(async() =>{
                    msg = await message.channel.send(ban.join('\n'));
                });
            } catch (err) {
                ban.push(`<:error:829478128970629150> **${member.user.tag}** ${this.lang.getError('banError')}`);
                msg = await (msg as Message).edit(ban.join('\n')).catch(async() =>{
                    msg = await message.channel.send(ban.join('\n'));
                });
            }
            await Util.delayFor(500);
        }
    }
}