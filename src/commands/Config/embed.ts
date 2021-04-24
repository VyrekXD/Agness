import { Message, TextChannel } from 'discord.js';
import Command from '../../structures/Command';
import { Embeds } from '../../database/embed';
import isImageURL from 'image-url-validator';
import Agness from '../../bot';

export default class EmbedCommand extends Command {
    exceptions = ['{user.avatar}', '{server.icon}', '{server.owner.avatar}'];
    colorRegex = /^[0-9A-F]{6}$/gi;

    constructor(client: Agness, category: string) {
        super(client, {
            name: 'embed',
            aliases: ['eb', 'emb'],
            usageArgs: ['[add/del/list/edit/show/props]', '<Name>', '[Property]', '[Value | null]'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            botChannelPermissions: ['EMBED_LINKS'],
            example: (p) => `${p}embed create rules`,
            cooldown: 5,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const replaceText = async (text: string) => {
            return await this.client.replaceText(text, {
                channel: message.channel as TextChannel,
                member: message.member!,
                prefix: this.server!.prefix
            });
        };
        switch (args[0]?.toLowerCase() ?? '') {
            case 'add':
            case 'create': {
                const embeds = await Embeds.find({ guildID: message.guild!.id });
                if (embeds.length >= 10) return message.channel.send(this.lang.getError('embedMax'));
                if (!args[1] || args[1].length >= 10) return this.sendError(message, this.lang.getError('embedName'), 1);
                if (embeds.find((e) => e.name === args[1])) return message.channel.send(this.lang.getError('embedExists'));
                const embed = await Embeds.create({
                    guildID: message.guild!.id,
                    name: args[1]
                });
                return message.channel.send(this.lang.get('embedCreated', this.server!.prefix, embed.name));
            }
            case 'del':
            case 'delete':
            case 'remove': {
                const embed = await Embeds.findOneAndDelete({
                    guildID: message.guild!.id,
                    name: args[1] ?? ''
                });
                if (!embed) return this.sendError(message, this.lang.getError('embedNoExists'), 1);
                return message.channel.send(this.lang.get('embedDeleted', embed.name));
            }
            case 'list': {
                const embeds = await Embeds.find({ guildID: message.guild!.id });
                return message.channel.send(this.lang.get('embedList', embeds.map((e, i) => `**${i + 1}**. ${e.name}`).join('\n'), message.guild!.iconURL({ dynamic: true }) ?? undefined)
                    .setColor(this.client.color));
            }
            case 'edit': {
                const embed = await Embeds.findOne({
                    guildID: message.guild!.id,
                    name: args[1] ?? ''
                });
                if (!embed) return this.sendError(message, this.lang.getError('embedNoExists'), 1);
                const property = args[2]?.toLowerCase() ?? '';
                switch (property) {
                    case 'footer':
                    case 'author': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        const parts = args.slice(3).join(' ').split(' | ');
                        if (property === 'footer' && parts[0].length > 2048) return message.channel.send(this.lang.getError('embedMaxCharacters', property, 2048));
                        if (property === 'author' && parts[0].length > 256) return message.channel.send(this.lang.getError('embedMaxCharacters', property, 2048));
                        if (args[3].toLowerCase() !== 'null') {
                            if (parts.length === 1) {
                                embed[property].text = parts[0];
                                embed[property].image = '';
                            } else {
                                if (!this.exceptions.includes(parts[1]))
                                    if (!(await isImageURL(parts[1]).catch(() => false))) return message.channel.send(this.lang.getError('noImage'));
                                embed[property].text = parts[0];
                                embed[property].image = parts[1];
                            }
                        }
                        break;
                    }
                    case 'title':
                    case 'description': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (property === 'title' && args.slice(3).join(' ').length > 256) return message.channel.send(this.lang.getError('embedMaxCharacters', property, 256));
                        if (args[3].toLowerCase() !== 'null')
                            embed[property] = args.slice(3).join(' ');
                        else embed[property] = '';
                        break;
                    }
                    case 'image':
                    case 'thumbnail': {
                        const imageLink = args[3] ?? message.attachments.first()?.url ?? '';
                        if (!imageLink) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (imageLink.toLowerCase() !== 'null') {
                            if (!this.exceptions.includes(imageLink))
                                if (!(await isImageURL(imageLink).catch(() => false))) return message.channel.send(this.lang.getError('noImage'));
                            embed[property] = imageLink;
                        } else embed[property] = '';
                        break;
                    }
                    case 'timestamp': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (!['yes', 'no'].includes(args[3])) return message.channel.send(this.lang.getError('embedNoTimestamp'));
                        embed[property] = args[3] === 'yes' ? true : false;
                        break;
                    }
                    case 'color': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (!this.colorRegex.test(args[3])) return message.channel.send(this.lang.getError('embedNoColor'));
                        embed[property] = args[3];
                        break;
                    }
                    default:
                        return this.sendError(message, this.lang.getError('embedNoProperty', this.server!.prefix), 2);
                }

                await embed.save();
                return message.channel.send(this.lang.get('embedEdited', property, embed.name), await this.client.generateEmbed(embed, replaceText));
            }
            case 'show':
            case 'preview': {
                const embed = await Embeds.findOne({ guildID: message.guild!.id, name: args[1] });
                if (!embed) return this.sendError(message, this.lang.getError('embedNoExists'), 1);
                return message.channel.send(await this.client.generateEmbed(embed, replaceText));
            }
            case 'props':
            case 'properties': {
                return message.channel.send(this.lang.get('embedProperties', this.server!.prefix)
                    .setColor(this.client.color));
            }
            default: {
                return message.channel.send(this.lang.get('embedHelp', this.server!.prefix)
                    .setColor(this.client.color)
                    .setImage('https://i.ibb.co/9YBv4tQ/image.png'));
            }
        }
    }
}