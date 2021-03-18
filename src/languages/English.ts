/* eslint-disable  max-lines */
import Language from '../structures/Language';
import Agness from '../bot';


export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            nativeName: 'English',
            flag: '🇺🇸',
            strings: {
                commands: {
                    help: (prefix) => `<:world:820783752489074748> **${client.user?.username} Help Panel**
Hi! At the moment I have **2** categories and  **${client.commands.size - client.commands.filter(c => c.category === 'Developer').size}** commands.
**Categories:**
> \`${prefix}help Config\` • Configuration Commands <:config:820788840654307348>
> \`${prefix}help General\` • Useful Commands <:general:820791014872449055>
**Do you need more help?**
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**Links**
**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, commands, commandsString) => {
                        const categories: Record<string, unknown> = {
                            config: '**Config** <:config:820788840654307348>',
                            general: '**General** <:general:820791014872449055>',
                            developer: '**Developer**'
                        };
                        return `**Commands in the category:** ${categories[(commands.first()?.category as string).toLowerCase()]}
This category has \`${commands.size}\` commands.
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**List of commands:**
\`\`\`
${commandsString}
\`\`\``;
                    },
                    helpCommand: (prefix, command) => {
                        return `__**${command?.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())} Command**__
**Description:** ${this.getDescription(command.name) || 'No description.'}
**Aliases:** ${command?.aliases.join(' | ') || 'No aliases.'}
**Category:** ${command?.category}
**Usage:** ${command?.usage(prefix)}
**Example:** ${command?.example(prefix)}
\`\`\`diff
In maintenance?: ${command?.enabled ? 'No.' : 'Yes.'}
Servers Only?: ${command?.guildOnly ? 'Yes' : 'No.'}
NSFW Only?: ${command?.nsfwOnly ? 'Yes.' : 'No.'}
Developers Only?: ${command?.devsOnly ? 'Yes.' : 'No.'}

Bot Permissions:
> Guild:
${command?.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command?.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}

Member Permissions:
> Guild:
${command?.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command?.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
\`\`\``;
                    },
                    helpNo: () => '> The command or category couldn\'t be found.',
                    prefixOK: (newPrefix) => `My new prefix is: \`${newPrefix}\``,
                    langTitle: () => 'List of Languages',
                    langDescription: (prefix) => `These are the languages currently available in Agness.
**If you want to change the language of Agness on the server use:**
> \`${prefix}lang <Language code>\`

${this.client.languages.map((l) => `- ${l.flag} **${l.nativeName}** (\`${l.code}\`)`).join('\n')}`
                },
                commandErrors: {
                    cmdServer: () => 'This command is only available for servers.',
                    cmdCooldown: (cooldown) => `You have to wait **${cooldown}s** to execute this command.`,
                    cmdEnabled: () => 'This command is under maintenance.',
                    cmdDevs: () => 'This command can only be used by developers.',
                    cmdNSFW: () => 'This command can only be used on NSFW channels.',
                    cmdMemberGuild: (perms) => `You need the following permissions:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdMemberChannel: (perms) => `You need the following permissions on this channel:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotGuild: (perms) => `I need the following permissions:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotChannel: (perms) => `I need the following permissions on this channel:\n\`\`\`diff\n${perms}\n\`\`\``,
                    prefixArgs: () => 'You must specify the new prefix.',
                    prefixLength: () => 'The new prefix must not exceed 5 characters.',
                    langNo: (prefix) => `You must specify a valid language.`
                },
                commandDescriptions: {
                    help: 'Displays helpful links and help for the bot.',
                    eval: 'Evaluate a code.',
                    ping: 'Shows the latency of the bot.',
                    prefix: 'Set a custom prefix on your server.'
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