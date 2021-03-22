import { Message, TextChannel } from 'discord.js';
import { Leaves } from '../../database/leave';
import Command from '../../structures/Command';
import { Embeds } from '../../database/embed';
import Agness from '../../bot';

export default class LeaveCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'leave',
            aliases: ['setleave'],
            usageArgs: ['[channel/message/config]', '[Value | null]'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            example: (p) => `${p}leave channel #goodbye`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        switch (args[0]?.toLowerCase() ?? '') {
            case 'channel': {
                if (!args[1]) return this.sendError(message, this.lang.getError('noChannel'), 1);
                let leave = await Leaves.findOne({ guildID: message.guild!.id });
                if (!leave)
                    leave = new Leaves({
                        guildID: message.guild!.id
                    });
                if (args[1].toLowerCase() === 'null') {
                    leave.channelID = '';
                    await leave.save();
                    return message.channel.send(this.lang.get('channelRemoved'));
                }
                const matchChannel = args[1]?.match(/^<#(\d+)>$/)?.[1] ?? args[1];
                const channel = (message.guild!.channels.resolve(matchChannel) ?? message.channel) as TextChannel;
                if (!channel || channel.type !== 'text') return this.sendError(message, this.lang.getError('noChannel'), 3);
                if (!channel.viewable) return message.channel.send(this.lang.getError('noChannelView'));
                if (!channel.permissionsFor(message.guild!.me!).has('SEND_MESSAGES')) return message.channel.send(this.lang.getError('noChannelWrite'));
                leave.channelID = channel.id;
                await leave.save();
                return message.channel.send(this.lang.get('leaveChannel', channel.toString()));
            }
            case 'message': {
                if (!args[1]) return this.sendError(message, this.lang.getError('noChannel'), 1);
                let leave = await Leaves.findOne({ guildID: message.guild!.id });
                if (!leave)
                    leave = new Leaves({
                        guildID: message.guild!.id
                    });
                if (args[1].toLowerCase() === 'null') {
                    leave.embedName = '';
                    leave.message = '';
                    await leave.save();
                    return message.channel.send(this.lang.get('messageRemoved'));
                }
                if (/{embed:\S+}/gi.test(args[1])) {
                    const embed = args[1].match(/{embed:\S+}/gi)?.[0].split(':')[1].slice(0, -1);
                    if (embed) {
                        const embedData = await Embeds.findOne({
                            guildID: message.guild!.id,
                            name: embed
                        });
                        if (!embedData) return message.channel.send(this.lang.getError('embedNoExists'));
                    }
                    leave.embedName = embed as string;
                    leave.message = '';
                } else {
                    // eslint-disable-next-line prefer-const
                    let text = args.slice(1).join(' ').replace(/\| {embed:\S+}$/gi, '').trim();
                    let embed = '';
                    if (/\| {embed:\S+}$/gi.test(args.slice(1).join(' '))) {
                        embed = args.slice(1).join(' ').match(/\| {embed:\S+}$/gi)?.[0].split(':')[1].slice(0, -1) ?? '';
                        const embedData = await Embeds.findOne({
                            guildID: message.guild!.id,
                            name: embed
                        });
                        if (!embedData) return message.channel.send(this.lang.getError('embedNoExists'));
                    }
                    leave.embedName = embed || '';
                    leave.message = text;
                }
                await leave.save();
                return message.channel.send(this.lang.get('leaveMessage', this.server!.prefix, !!leave.embedName));
            }
            case 'config':
            case 'settings':
            case 'configuration': {
                let leave = await Leaves.findOne({
                    guildID: message.guild!.id
                });
                if (!leave)
                    leave = await Leaves.create({
                        guildID: message.guild!.id
                    });
                return message.channel.send(this.lang.get('leaveConfig', leave, this.server!.prefix)
                    .setColor(this.client.color));
            }
            default:
                return message.channel.send(this.lang.get('leaveHelp', this.server!.prefix)
                    .setColor(this.client.color));
        }
    }
}