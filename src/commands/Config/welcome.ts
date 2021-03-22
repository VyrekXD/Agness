import { Message, TextChannel } from 'discord.js';
import { Welcomes } from '../../database/welcome';
import Command from '../../structures/Command';
import { Embeds } from '../../database/embed';
import Agness from '../../bot';

export default class WelcomeCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'welcome',
            aliases: ['setwelcome'],
            usageArgs: ['[channel/message/config/role]', '[Value | null]'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            example: (p) => `${p}welcome channel #welcomes`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        switch (args[0]?.toLowerCase() ?? '') {
            case 'channel': {
                if (!args[1]) return this.sendError(message, this.lang.getError('noChannel'), 1);
                let welcome = await Welcomes.findOne({ guildID: message.guild!.id });
                if (!welcome)
                    welcome = new Welcomes({
                        guildID: message.guild!.id
                    });
                if (args[1].toLowerCase() === 'null') {
                    welcome.channelID = '';
                    await welcome.save();
                    return message.channel.send(this.lang.get('channelRemoved'));
                }
                const matchChannel = args[1]?.match(/^<#(\d+)>$/)?.[1] ?? args[1];
                const channel = (message.guild!.channels.resolve(matchChannel) ?? message.channel) as TextChannel;
                if (!channel || channel.type !== 'text') return this.sendError(message, this.lang.getError('noChannel'), 3);
                if (!channel.viewable) return message.channel.send(this.lang.getError('noChannelView'));
                if (!channel.permissionsFor(message.guild!.me!).has('SEND_MESSAGES')) return message.channel.send(this.lang.getError('noChannelWrite'));
                welcome.channelID = channel.id;
                await welcome.save();
                return message.channel.send(this.lang.get('welcomeChannel', channel.toString()));
            }
            case 'message': {
                if (!args[1]) return this.sendError(message, this.lang.getError('noChannel'), 1);
                let welcome = await Welcomes.findOne({ guildID: message.guild!.id });
                if (!welcome)
                    welcome = new Welcomes({
                        guildID: message.guild!.id
                    });
                if (args[1].toLowerCase() === 'null') {
                    welcome.embedName = '';
                    welcome.message = '';
                    await welcome.save();
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
                    welcome.embedName = embed as string;
                    welcome.message = '';
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
                    welcome.embedName = embed || '';
                    welcome.message = text;
                }
                await welcome.save();
                return message.channel.send(this.lang.get('welcomeMessage', this.server!.prefix, !!welcome.embedName));
            }
            case 'role':
            case 'joinrole':
            case 'autorole': {
                if (!args[1] || !['user', 'bot'].includes(args[1].toLowerCase())) return message.channel.send(this.lang.getError('welcomeRoleType'));
                if (!args[2]) return message.channel.send(this.lang.getError('noRole'));
                let welcome = await Welcomes.findOne({ guildID: message.guild!.id });
                if (!welcome)
                    welcome = new Welcomes({
                        guildID: message.guild!.id
                    });
                if (args[2].toLowerCase() === 'null') {
                    welcome.autorole[args[1].toLowerCase() as 'user' | 'bot'] = '';
                    await welcome.save();
                    return message.channel.send(this.lang.get('welcomeRoleRemoved', args[1].toLowerCase()));
                }
                const matchRole = args[2]?.match(/^<@&(\d+)>$/)?.[1] ?? args[0];
                const role = message.guild!.roles.resolve(matchRole);
                if (!role) return this.sendError(message, this.lang.getError('noRole'), 0);
                if (!role.editable) return message.channel.send(this.lang.getError('noRoleAdd'));
                welcome.autorole[args[1].toLowerCase() as 'user' | 'bot'] = role.id;
                await welcome.save();
                return message.channel.send(this.lang.get('welcomeRole', role.toString(), args[1].toLowerCase(), this.server!.prefix), {
                    allowedMentions: {
                        roles: []
                    }
                });
            }
            case 'config':
            case 'settings':
            case 'configuration': {
                let welcome = await Welcomes.findOne({
                    guildID: message.guild!.id
                });
                if (!welcome)
                    welcome = await Welcomes.create({
                        guildID: message.guild!.id
                    });
                return message.channel.send(this.lang.get('welcomeConfig', welcome, this.server!.prefix)
                    .setColor(this.client.color));
            }
            default:
                return message.channel.send(this.lang.get('welcomeHelp', this.server!.prefix)
                    .setColor(this.client.color));
        }
    }
}