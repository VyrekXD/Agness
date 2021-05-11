import Command from '../../structures/Command';
import optionsManager from '../../Utils/optionsManager';
import { Message, Util } from 'discord.js';
import Agness from '../../bot';

export default class KickCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'kick',
            aliases: ['patear'],
            botGuildPermissions: ['KICK_MEMBERS'],
            botChannelPermissions: ['KICK_MEMBERS'],
            usageArgs: ['[@mentions | IDs]', '--reason "<reason>"'],
            example: (prefix) => `\n${prefix}kick @Aviii Beautifull.\n${prefix}kick @Aviii @Andremor @Watermelon`,
            cooldown: 10,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        if (!args[0]) return this.sendError(message, this.lang.getError('kickNoArgs'), 0);
        try {
            const arr = optionsManager([
                {
                    name: 'reason',
                    requireValue: true,
                    allowQuotes: true
                }
            ], args);
            if (
                arr.find(x => x.name === 'reason') &&
                !arr.find(x => x.name === 'reason')?.value
            ) return message.channel.send(this.lang.getError('reasonInvalid'));
            const members = message.mentions.members?.filter(m => (m.kickable) && (m.id !== message.guild!.ownerID) && (m.roles.highest.comparePositionTo(message.member!.roles.highest) < 0)).array() || [];
            for (const IDs of args) {
                if (IDs.length > 19) continue;
                if (/^<@!?(\d+)>$/.test(IDs)) continue;
                if (isNaN(IDs as unknown as number)) continue;
                const user = message.guild!.members.cache.get(IDs) || await message.guild!.members.fetch(IDs).catch(() => { false });
                if (user) {
                    if (user.kickable) {
                        if (!members.some(e => e.id === user.id)) {
                            if ((message.guild!.ownerID !== user.id) && (user.roles.highest.comparePositionTo(message.member!.roles.highest) < 0)) {
                                members.push(user);
                            }
                        } else continue;
                    } else continue;
                } else continue;
            }
            if (members.length < 1) return message.channel.send(this.lang.getError('kickNoUsers'));
            if (members.length > 20) return message.channel.send(this.lang.getError('kickUsersMax'));
            const kick: string[] = [this.lang.get('reasonDays', arr.find(x => x.name === 'reason')?.value || null, null)];
            let msg: Message | void = await message.channel.send(this.lang.get('waiting'));
            for (const member of members) {
                try {
                    await member.kick(arr.find(x => x.name === 'reason')?.value || undefined);
                    kick.push(`<:right:830079699803701259> **${member.user.tag}** ${this.lang.get('kickCheck')}`);
                    msg = await (msg as Message).edit(kick.join('\n')).catch(async () => {
                        msg = await message.channel.send(kick.join('\n'));
                    });
                } catch (err) {
                    kick.push(`<:error:829478128970629150> **${member.user.tag}** ${this.lang.getError('kickError')}`);
                    msg = await (msg as Message).edit(kick.join('\n')).catch(async () => {
                        msg = await message.channel.send(kick.join('\n'));
                    });
                }
                await Util.delayFor(500);
            }
        } catch (e) {
            return message.channel.send(this.lang.getError('reasonNoComillas'));
        }
    }
}