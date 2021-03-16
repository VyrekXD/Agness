/* eslint-disable  max-lines */
import Language from '../structures/Language';
import { PermissionString } from 'discord.js';
import Agness from '../bot';


export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            displayName: 'English',
            strings: {
                commands: {
                    help: (prefix: string): string => `<:world:820783752489074748> **${client.user?.username} Help Panel**
Hi! At the moment I have **2** categories and  **${client.commands.size}** commands.
**Categories:**
> \`${prefix}help Config\` • Configuration Commands <:config:820788840654307348>
> \`${prefix}help General\` • Useful Commands <:general:820791014872449055>
**Do you need more help?**
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**Links**
**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix: string, category: 'config' | 'general' | 'developer'): string => {
                        const categories = {
                            config: '**Config** <:config:820788840654307348>',
                            general: '**General** <:general:820791014872449055>',
                            developer: '**Developer**'
                        };
                        const commands = client.commands.filter((c) => c.category.toLowerCase() == category);
                        return `**Commands in the category:** ${categories[category]}
This category has \`${commands.size}\` commands.
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**List of commands:**
\`\`\`
${Array(Math.ceil(commands.array().length / 4)).fill([]).map((_, i) => commands.array().map((c) => c.name).slice(i * 4, (i * 4) + 4)).map((l) => l.map((c) => c.padEnd(17, ' ')).join('').trim()).join('\n')}
\`\`\``;
                    },
                    helpCommand: (prefix: string, command: string): string => {
                        const findCom = this.client.commands.get(command);
                        return `__**${findCom?.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())} Command**__
**Description:** ${findCom?.description || 'No description.'}
**Aliases:** ${findCom?.aliases.join(' | ') || 'No aliases.'}
**Category:** ${findCom?.category}
**Usage:** ${findCom?.usage(prefix)}
**Example:** ${findCom?.example(prefix)}
\`\`\`diff
In maintenance?: ${findCom?.enabled ? 'No.' : 'Yes.'}
Servers Only?: ${findCom?.guildOnly ? 'Yes' : 'No.'}
NSFW Only?: ${findCom?.nsfwOnly ? 'Yes.' : 'No.'}
Developers Only?: ${findCom?.devsOnly ? 'Yes.' : 'No.'}

Bot Permissions:
> Guild:
${findCom?.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${findCom?.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}

Member Permissions:
> Guild:
${findCom?.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${findCom?.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
\`\`\``;
                    },
                    helpNo: () => '> The command or category couldn\'t be found.',
                    cmdServer: () => 'This command is only available for servers.',
                    cmdCooldown: (cooldown) => `You have to wait **${cooldown}s** to execute this command.`,
                    cmdEnabled: () => 'This command is under maintenance.',
                    cmdDevs: () => 'This command can only be used by developers.',
                    cmdNSFW: () => 'This command can only be used on NSFW channels.',
                    cmdMemberGuild: (perms: PermissionString[]) => `You need the following permissions:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdMemberChannel: (perms: PermissionString[]) => `You need the following permissions on this channel:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdBotGuild: (perms: PermissionString[]) => `I need the following permissions:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdBotChannel: (perms: PermissionString[]) => `I need the following permissions on this channel:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``
                },
                permissions: {
                    ADMINISTRATOR: 'Administrator',
                    MANAGE_GUILD: 'Manage Server',
                    BAN_MEMBERS: 'Ban Members',
                    KICK_MEMBERS: 'Kick Members',
                    READ_MESSAGE_HISTORY: 'Read Message History',
                    SEND_MESSAGES: 'Send Messages',
                    EMBED_LINKS: 'Embed Links',
                    ADD_REACTIONS: 'Add Reactions',
                    CREATE_INSTANT_INVITE: 'Create Invite',
                    MANAGE_CHANNELS: 'Manage Channels',
                    VIEW_AUDIT_LOG: 'View Audit Log',
                    PRIORITY_SPEAKER: 'Priority Speaker',
                    STREAM: 'Stream',
                    VIEW_CHANNEL: 'View Channel',
                    SEND_TTS_MESSAGES: 'Send Text-to-Speach Messages',
                    MANAGE_MESSAGES: 'Manage Messages',
                    ATTACH_FILES: 'Attach Files',
                    MENTION_EVERYONE: 'Mention Everyone',
                    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
                    VIEW_GUILD_INSIGHTS: 'View Guild Insights',
                    CONNECT: 'Connect',
                    SPEAK: 'Speak',
                    MUTE_MEMBERS: 'Mute Members',
                    DEAFEN_MEMBERS: 'Defean Members',
                    MOVE_MEMBERS: 'Move Members',
                    USE_VAD: 'Use Voice Activity',
                    CHANGE_NICKNAME: 'Change Nickname',
                    MANAGE_NICKNAMES: 'Manage Nicknames',
                    MANAGE_ROLES: 'Manage Roles',
                    MANAGE_WEBHOOKS: 'Manage Webhooks',
                    MANAGE_EMOJIS: 'Manage Emojis'
                }
            }
        });
    }
}