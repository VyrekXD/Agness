import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { ReactionRoles } from '../../database/reaction';
import Command from '../../structures/Command';
import Agness from '../../bot';

export default class ReactionRoleCommand extends Command {
    types = ['normal', 'unique', 'only'];
    emojiUnicode = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    emojiDiscord = /<a?:[a-z]{3,32}:\d{16,19}>/gi;

    constructor(client: Agness, category: string) {
        super(client, {
            name: 'reactrole',
            aliases: ['rr', 'reactionrole', 'reactionroles'],
            usageArgs: ['[@Role]', '[normal/unique/only]', '[Message ID]', '<#Channel>'],
            botGuildPermissions: ['MANAGE_ROLES'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            example: (p) => `${p}reactrole @Watermelon normal 12345789101112 #self-roles`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setDescription(this.lang.getError('rrNoOption', this.server!.prefix))
            .setColor(this.client.color));
        switch (args[0].toLowerCase()) {
            case 'help': {
                switch (args[1]?.toLowerCase() ?? '') {
                    case 'normal':
                        return message.channel.send(this.lang.get('rrNormal')
                            .setImage('https://i.imgur.com/cNdxEOu.gif')
                            .setColor(this.client.color));
                    case 'unique':
                        return message.channel.send(this.lang.get('rrUnique')
                            .setImage('https://i.imgur.com/6r10DI8.gif')
                            .setColor(this.client.color));
                    case 'only':
                        return message.channel.send(this.lang.get('rrOnly')
                            .setImage('https://i.imgur.com/iicDknk.gif')
                            .setColor(this.client.color));
                    default:
                        return message.channel.send(this.lang.get('rrHelp', this.server!.prefix)
                            .setImage('https://i.imgur.com/cNdxEOu.gif')
                            .setColor(this.client.color));
                }
            }
            case 'delete': {
                if (!args[1]) return message.channel.send(this.lang.getError('rrDeleteNoEmoji'));
                if (!args[2]) return message.channel.send(this.lang.getError('rrDeleteNoMessage'));
                if (!args[1].match(this.emojiUnicode) && !args[1].match(this.emojiDiscord))
                    return message.channel.send(this.lang.getError('rrDeleteEmoji'));
                const emojiID = args[1].includes(':') ? args[1].split(':')[2].slice(0, -1) : args[1];
                const reactionRole = await ReactionRoles.findOneAndDelete({ guildID: message.guild!.id, messageID: message.id, emojiID });
                if (!reactionRole) return message.channel.send(this.lang.getError('rrDeleteNo'));
                return message.channel.send(this.lang.get('rrDelete', args[1]));
            }
            default: {
                const matchRole = args[0]?.match(/^<@&(\d+)>$/)?.[1] ?? args[0];
                const role = message.guild!.roles.resolve(matchRole);
                if (!role) return this.sendError(message, this.lang.getError('noRole'), 0);
                if (!role.editable) return message.channel.send(this.lang.getError('noRoleAdd'));

                if (!args[1] || !this.types.includes(args[1].toLowerCase())) return this.sendError(message, this.lang.getError('rrNoType', this.server!.prefix), 1);

                const messageID = args[2] ?? '';
                if (!messageID) return this.sendError(message, this.lang.getError('rrNoMessage'), 2);

                const matchChannel = args[3]?.match(/^<#(\d+)>$/)?.[1] ?? args[3];
                const channel = (message.guild!.channels.resolve(matchChannel) ?? message.channel) as TextChannel;
                if (!channel || channel.type !== 'text') return this.sendError(message, this.lang.getError('noChannel'), 3);
                if (!channel.viewable) return message.channel.send(this.lang.getError('noChannelView'));
                if (!channel.permissionsFor(message.guild!.me!).has('ADD_REACTIONS')) return message.channel.send(this.lang.getError('rrNoChannelReactions'));

                try {
                    // eslint-disable-next-line
                    var reactMessage = await channel.messages.fetch(messageID);
                    if (!reactMessage) return message.channel.send(this.lang.getError('rrNoMessageFound'));
                } catch {
                    return message.channel.send(this.lang.getError('rrErrorMessage'));
                }
                const sentMessage = await message.channel.send(this.lang.get('rrReact', role.toString()), {
                    allowedMentions: { roles: [] }
                });
                try {
                    const collected = await sentMessage.awaitReactions((r, u) => u.id === message.author.id, {
                        max: 1,
                        time: 30e3,
                        errors: ['time']
                    });
                    const emoji = collected.first()!.emoji;
                    if (sentMessage.deletable) await sentMessage.delete();
                    if (emoji.id && !this.client.emojis.resolve(emoji.id)) return message.channel.send(this.lang.getError('rrNoEmoji'));
                    const emojiID = emoji.id ?? emoji.name;
                    const reactionRole = await ReactionRoles.findOne({ messageID, reaction: emojiID });
                    if (reactionRole) return message.channel.send(this.lang.getError('rrExists'));
                    await reactMessage.react(emojiID);
                    await ReactionRoles.create({
                        guildID: message.guild!.id,
                        channelID: channel.id,
                        roleID: role.id,
                        messageID,
                        emojiID,
                        type: args[1].toLowerCase()
                    });
                    return message.channel.send(this.lang.get('rr', role.toString(), emoji.toString()), {
                        allowedMentions: { roles: [] }
                    });
                } catch {
                    if (sentMessage.deletable) await sentMessage.delete();
                    return message.channel.send(this.lang.getError('rrTime'));
                }
            }
        }
    }
}