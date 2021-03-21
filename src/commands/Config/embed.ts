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
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
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
                return message.channel.send(this.lang.get('embedCreated', embed.name));
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
                return message.channel.send(this.lang.get('embedList', embeds.map((e, i) => `**${i + 1}**. ${e.name}`).join('\n'), message.guild!.iconURL()!)
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
                        if (property === 'footer' && parts[0].length > 2048) return message.channel.send(this.lang.getError('embedMaxCharacters', property, 2048)); // 'The --- must have --- characters or less.'
                        if (property === 'author' && parts[0].length > 256) return message.channel.send(this.lang.getError('embedMaxCharacters', property, 2048));
                        if (args[3].toLowerCase() !== 'null') {
                            if (parts.length === 1) {
                                embed[property].text = parts[0];
                                embed[property].image = '';
                            } else {
                                if (!this.exceptions.includes(parts[1]))
                                    if (!(await isImageURL(parts[1]))) return message.channel.send(this.lang.getError('embedNoImage')); // You must specify the URL of a valid image.
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
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (args[3].toLowerCase() !== 'null') {
                            if (!this.exceptions.includes(args[3]))
                                if (!(await isImageURL(args[3]))) return message.channel.send(this.lang.getError('embedNoImage'));
                            embed[property] = args[3];
                            embed[property] = args[3];
                        } else embed[property] = '';
                        break;
                    }
                    case 'timestamp': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (!['yes', 'no'].includes(args[3])) return message.channel.send(this.lang.getError('embedNoTimestamp')); // You must specify if you want the timestamp (yes/no).
                        embed[property] = args[3] === 'yes' ? true : false;
                        break;
                    }
                    case 'color': {
                        if (!args[3]) return this.sendError(message, this.lang.getError('embedNoValue', property), 3);
                        if (!this.colorRegex.test(args[3])) return message.channel.send(this.lang.getError('embedNoColor')); // You must specify the color without #.
                        break;
                    }
                    default:
                        return this.sendError(message, this.lang.getError('embedNoProperty'), 2); // `The property that you put isn't valid.\nYou can see the list of the properties with \`${this.prefix}embed properties\`.`
                }

                await embed.save();
                return message.channel.send(this.lang.get('embedEdited', property, embed.name)); // The ----- property of the embed --- was edited successfully
            }
            case 'show':
            case 'preview': {
                const embed = await Embeds.findOne({ guildID: message.guild!.id, name: args[1] });
                if (!embed) return this.sendError(message, this.lang.getError('embedNoExists'), 1);
                return message.channel.send(this.client.generateEmbed(embed,
                    (text) => this.client.replaceText(text, {
                        channel: message.channel as TextChannel,
                        member: message.member!,
                        prefix: this.server!.prefix
                    })
                ));
            }
            case 'props':
            case 'properties': {
                return message.channel.send(this.lang.get('embedProperties')
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