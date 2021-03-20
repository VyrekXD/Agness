/* eslint-disable max-lines */
import Language from '../structures/Language';
import Agness from '../bot';


export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            flag: '🇺🇸',
            nativeName: 'English',
            strings: {
                commands: {
                    help: (prefix, categories, commands) => `<:world:820783752489074748> **${client.user?.username} Help Panel**
Hi! At the moment I have **${categories}** categories and  **${commands}** commands.
**Categories:**
> \`${prefix}help Config\` • Configuration Commands <:config:820788840654307348>
> \`${prefix}help General\` • Useful Commands <:general:820791014872449055>
**Do you need more help?**
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**Links**
**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, category, commands, quantity) => {
                        const categories = {
                            Config: '**Config** <:config:820788840654307348>',
                            General: '**General** <:general:820791014872449055>',
                            Developer: '**Developer**'
                        };
                        return `**Commands in the category:** ${categories[category]}
This category has \`${quantity}\` commands.
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**List of commands:**
\`\`\`
${commands}
\`\`\``;
                    },
                    helpCommand: (prefix, command) => {
                        return `__**${command.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())} Command**__
**Description:** ${this.getDescription(command.name) || 'No description.'}
**Aliases:** ${command.aliases.join(' | ') || 'No aliases.'}
**Category:** ${command.category}
**Usage:** ${command.usage(prefix)}
**Example:** ${command.example(prefix)}
\`\`\`diff
In maintenance?: ${command.enabled ? 'No.' : 'Yes.'}
Servers Only?: ${command.guildOnly ? 'Yes' : 'No.'}
NSFW Only?: ${command.nsfwOnly ? 'Yes.' : 'No.'}
Developers Only?: ${command.devsOnly ? 'Yes.' : 'No.'}

Bot Permissions:
> Guild:
${command.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}

Member Permissions:
> Guild:
${command.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
\`\`\``;
                    },
                    prefix: (prefix) => `My new prefix is: \`${prefix}\``,
                    langTitle: () => 'List of Languages',
                    langDescription: (prefix, languages) => `These are the languages currently available in Agness.
**If you want to change the language of Agness on the server use:**
> \`${prefix}lang <Language code>\`

${languages}`,
                    guildsDescription: (members, guilds) => `At this moment, I'm in: **${guilds}** servers and with **${members}** users.`,
                    guildsFooter: (shardID) => `This server is on the shard ${shardID}`,
                    voteDescription: () => `I really appreciate that you want to vote for me!
[Vote for me here!](https://top.gg/bot/798573830645874718)
Remember that you can vote every 12 hours.`,
                    voteFooter: () => 'With love ❤️',
                    avatar: (user, avatar) => `**${user}**'s avatar
> [Avatar Link](${avatar})`
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
                    langNo: () => 'You must specify a valid language.',
                    helpNo: () => '> The command or category couldn\'t be found.',
                    sayNoText: () => 'Give me a text that you want me to say.',
                    sayNoPerms: () => 'You must have the permission of mention everyone to execute this command.'
                },
                commandDescriptions: {
                    help: 'Displays helpful links and help for the bot.',
                    eval: 'Evaluates code.',
                    ping: 'Shows the latency of the bot.',
                    prefix: 'Lets you set a custom prefix on your server.',
                    guilds: 'Shows the guild count and users I have.',
                    say: 'I say everything you ask of me.',
                    avatar: 'Gets the avatar of any user.',
                    vote: 'Shows the Top.gg link to vote for me.'
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