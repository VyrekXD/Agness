import Command from '../../structures/Command';
import { Embeds } from '../../database/embed';
import isImageURL from 'image-url-validator';
import { Tags } from '../../database/tags';
import { Message, Role } from 'discord.js';
import Agness from '../../bot';

export default class TagsCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'tags',
            aliases: ['tag', 'customcommands', 'customcmd', 'commands'],
            usageArgs: ['[add/edit/del/list]', '<Name>', '[Properties]'],
            memberGuildPermissions: ['ADMINISTRATOR'],
            botChannelPermissions: ['EMBED_LINKS'],
            example: (p) => `${p}tags create rules (message:Use common sense.)`,
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        switch (args[0]?.toLowerCase() ?? '') {
            case 'add':
            case 'create': {
                const tags = await Tags.find({ guildID: message.guild!.id });
                if (tags.length >= 10) return message.channel.send(this.lang.getError('tagsMax'));
                if (!args[1] || args[1].length >= 10) return this.sendError(message, this.lang.getError('tagsName'), 1);
                if (tags.find((t) => t.name === args[1])) return message.channel.send(this.lang.getError('tagsExists'));
                if (this.client.commands.get(args[1].toLowerCase())) return message.channel.send(this.lang.getError('tagsNoCommand'));
                const variables = args.slice(2).join(' ').split('{').map((s) => s.split('}')[0]);
                const variableMessage = args.slice(2).join(' ').split('(').map((s) => s.split(')')[0]);
                const options: Record<string, unknown> = {
                    embed: '',
                    addrole: [],
                    removerole: []
                };
                variables.forEach((variable) => {
                    // eslint-disable-next-line prefer-const
                    let [name, ...values] = variable.split(':');
                    if (!Object.keys(options).concat('addRole', 'removeRole').includes(name)) return;
                    if (name === 'addRole') name = 'addrole';
                    if (name === 'removeRole') name = 'removerole';
                    if (['addrole', 'removerole'].includes(name)) options[name] = values.map((r) => message.guild!.roles.resolve(r));
                    else options[name] = !values[1] && values[0] ? values[0] : values;
                });
                options.image = '';
                options.message = '';
                variableMessage.forEach((variable) => {
                    const [name, ...value] = variable.split(':');
                    if (name === 'image') options.image = value.join(':');
                    else if (name === 'message') options.message = value.join(':');
                });
                if (!options.message && !options.embed && !options.image) return this.sendError(message, this.lang.getError('tagsNoMessage'), 2);
                if (options.image)
                    if (!(await isImageURL(options.image as string))) return message.channel.send(this.lang.getError('noImage'));
                if (options.embed) {
                    const embed = await Embeds.findOne({
                        guildID: message.guild!.id,
                        name: options.embed as string
                    });
                    if (!embed) return message.channel.send(this.lang.getError('embedNoExists'));
                }
                if (((options.addrole as Role[]).length > 0 || (options.removerole as Role[]).length > 0) && !message.guild!.me!.permissions.has('MANAGE_ROLES')) return message.channel.send(this.lang.getError('tagsNoRolePerms'));
                if ((options.addrole as Role[]).some(r => !r || !r.editable)) return message.channel.send(this.lang.getError('tagsNoRole'));
                if ((options.removerole as Role[]).some(r => !r || !r.editable)) return message.channel.send(this.lang.getError('tagsNoRole'));
                const tag = await Tags.create({
                    guildID: message.guild!.id,
                    name: args[1].toLowerCase(),
                    removeRoleID: (options.removerole as Role[]).map((r) => r.id),
                    addRoleID: (options.addrole as Role[]).map((r) => r.id),
                    embedName: options.embed,
                    message: options.message,
                    image: options.image
                });
                return message.channel.send(this.lang.get('tagsCreated', tag.name));
            }
            case 'edit': {
                const tag = await Tags.findOne({
                    guildID: message.guild!.id,
                    name: args[1] ?? ''
                });
                if (!tag) return this.sendError(message, this.lang.getError('tagsNoExists'), 1);
                const variables = args.slice(2).join(' ').split('{').map((s) => s.split('}')[0]);
                const variableMessage = args.slice(2).join(' ').split('(').map((s) => s.split(')')[0]);
                const options: Record<string, unknown> = {
                    embed: '',
                    addrole: [],
                    removerole: []
                };
                variables.forEach((variable) => {
                    // eslint-disable-next-line prefer-const
                    let [name, ...values] = variable.split(':');
                    if (!Object.keys(options).concat('addRole', 'removeRole').includes(name)) return;
                    if (name === 'addRole') name = 'addrole';
                    if (name === 'removeRole') name = 'removerole';
                    if (['addrole', 'removerole'].includes(name)) options[name] = values.map((r) => message.guild!.roles.resolve(r));
                    else options[name] = !values[1] && values[0] ? values[0] : values;
                });
                options.image = '';
                options.message = '';
                variableMessage.forEach((variable) => {
                    const [name, ...value] = variable.split(':');
                    if (name === 'image') options.image = value.join(':');
                    else if (name === 'message') options.message = value.join(':');
                });
                if (!options.message && !options.embed && !options.image) return message.channel.send(this.lang.getError('tagsNoMessage'));
                if (options.image)
                    if (!(await isImageURL(options.image as string))) return message.channel.send(this.lang.getError('noImage'));
                if (options.embed) {
                    const embed = await Embeds.findOne({
                        guildID: message.guild!.id,
                        name: options.embed as string
                    });
                    if (!embed) return message.channel.send(this.lang.getError('embedNoExists'));
                }
                if (((options.addrole as Role[]).length > 0 || (options.removerole as Role[]).length > 0) && !message.guild!.me!.permissions.has('MANAGE_ROLES')) return message.channel.send(this.lang.getError('tagsNoRolePerms'));
                if ((options.addrole as Role[]).some(r => !r || !r.editable)) return message.channel.send(this.lang.getError('tagsNoRole'));
                if ((options.removerole as Role[]).some(r => !r || !r.editable)) return message.channel.send(this.lang.getError('tagsNoRole'));
                tag.removeRoleID = (options.removerole as Role[]).map((r) => r.id);
                tag.addRoleID = (options.addrole as Role[]).map((r) => r.id);
                tag.embedName = options.embed as string;
                tag.message = options.message as string;
                tag.image = options.image as string;
                await tag.save();
                return message.channel.send(this.lang.get('tagsEdited', tag.name));
            }
            case 'del':
            case 'delete':
            case 'remove': {
                const tag = await Tags.findOneAndDelete({
                    guildID: message.guild!.id,
                    name: args[1] ?? ''
                });
                if (!tag) return this.sendError(message, this.lang.getError('tagsNoExists'), 1);
                return message.channel.send(this.lang.get('tagsDeleted', tag.name));
            }
            case 'list': {
                const tags = await Tags.find({ guildID: message.guild!.id });
                return message.channel.send(this.lang.get('tagsList', tags.map((t, i) => `**${i + 1}**. ${t.name}`).join('\n'), message.guild!.iconURL({ dynamic: true }) ?? undefined)
                    .setColor(this.client.color));
            }
            case 'props':
            case 'properties': {
                return message.channel.send(this.lang.get('tagsProperties')
                    .setColor(this.client.color));
            }
            default:
                return message.channel.send(this.lang.get('tagsHelp', this.server!.prefix)
                    .setColor(this.client.color));
        }
    }
}