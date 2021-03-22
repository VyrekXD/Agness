/* eslint-disable max-lines */
import Language from '../structures/Language';
import { MessageEmbed } from 'discord.js';
import Agness from '../bot';

export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            flag: '🇺🇸',
            nativeName: 'English',
            strings: {
                commands: {
                    help: (prefix, categories, commands) => `<:world:820783752489074748> **${client.user!.username} Help Panel**
Hi! At the moment I have **${categories}** categories and  **${commands}** commands.
**Categories:**
> \`${prefix}help Config\` • Configuration Commands <:config:820788840654307348>
> \`${prefix}help General\` • Useful Commands <:general:820791014872449055>
**Do you need more help?**
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**Links**
**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
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
**Description:** ${this.getDescription(command.name) ?? 'No description.'}
**Aliases:** ${command.aliases.join(' | ') ?? 'No aliases.'}
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
${command.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'Doesn\'t need.'}
> Channel:
${command.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'Doesn\'t need.'}

Member Permissions:
> Guild:
${command.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'Doesn\'t need.'}
> Channel:
${command.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'Doesn\'t need.'}
\`\`\``;
                    },
                    prefix: (prefix) => `My new prefix is: \`${prefix}\``,
                    langTitle: () => 'List of Languages',
                    langDescription: (prefix, languages) => `There're the languages currently available in Agness.
**If you want to change the language of Agness on the server use:**
> \`${prefix}lang <Language code>\`

${languages}`,
                    guildsDescription: (members, guilds) => `At this moment, I'm in **${guilds}** servers and with **${members}** users.`,
                    guildsFooter: (shardID) => `This server is on the shard ${shardID}`,
                    voteDescription: () => `I really appreciate that you want to vote for me!
[Vote for me here!](https://top.gg/bot/798573830645874718)
Remember that you can vote every 12 hours.`,
                    voteFooter: () => 'With love ❤️',
                    avatar: (user, avatar) => `**${user}**'s avatar
> [Avatar Link](${avatar})`,
                    rrHelp: (prefix) => new MessageEmbed()
                        .addField('Reaction Role Types', `At the moment, there're 3 types of reaction roles. To get specific information about one, use:
> \`${prefix}reactrole help normal\`
> \`${prefix}reactrole help unique\`
> \`${prefix}reactrole help only\``)
                        .addField('How do I get the ID of a message?', `You must turn on the __Developer Mode__ in settings, right click a message and copy ID.
Detalied information in the GIF below.`),
                    rrReact: (role) => `I'm preparing the reaction role for ${role}.
You have 30 seconds to react with the emoji with which you want the role to be given.`,
                    rr: (role, emoji) => `The role **${role}** will be given the next time someone reacts with the emoji ${emoji} in that message.`,
                    rrNormal: () => new MessageEmbed()
                        .setTitle('Normal Type Reaction')
                        .setDescription(`The reaction role of type **normal** allows you to add and remove the specified role when you react or when you remove the reaction.
There's an example of how it works and setup:`),
                    rrUnique: () => new MessageEmbed()
                        .setTitle('Unique Type Reaction')
                        .setDescription(`The reaction role of type **unique** allows you to add the specified role once and it'll not be removed.
There's an example of how it works and setup:`),
                    rrOnly: () => new MessageEmbed()
                        .setTitle('Only Type Reaction')
                        .setDescription(`The reaction role of type **only** allows you to have only one role from the others of the same type in the message.
There's an example of how it works and setup:`),
                    rrDelete: (emoji) => `Reaction role with emoji ${emoji} deleted successfully.`,
                    embedHelp: (prefix) => new MessageEmbed()
                        .setTitle('¿Para que sirve un embed?')
                        .setDescription('Te permitirá crear un texto con mayor estética para insertarlos en tus bienvenidas, despedidas, reglas, etc., para mejorar en cuanto estética a tu servidor. Lo siguiente son pasos para poder crear y editar tu embed.')
                        .addField('1. Create and name your embed.', `__First of all you should not include [] or <> in the command__
The name will allow us to identify your embed so that everything looks more orderly when it comes to putting it in welcomes, leaves and custom commands. How? Well, adding \`{embed:[embed_name]}\` and Replacing \`embed_name\` with the name of your embed. For this, you can create it and give it the name you like, just like this:
> \`${prefix}embed create [embed_name]\``)
                        .addField('2. Editing our embed', `Well, it's time to edit it the way you like, your creativity matters! Here I show you the properties of an embed:
> \`author\` - [text | <Image link>]
> \`thumbnail\` - [Image link]
> \`title\` - [text]
> \`description\` - [text]
> \`footer\` - [text | <Image link>]
> \`image\` - [Image link]
> \`color\` - [Hex Code]
> \`timestamp\` - [yes/no]
The way of use is intuitive with which it will be easier for you to learn each property. Well, without more, the embed editing mode, and it's as follows:
> \`${prefix}embed edit [name] [property] [value]\``)
                        .addField('**EXAMPLE**', `Now, let's look at a small example with some properties, which will allow you to familiarize yourself with the simple format.
We start by creating an embed which we will call \`example\`.
> \`${prefix}embed create example\`
Now, to give it an attractive title
> \`${prefix}embed edit example title I am learning how to edit an embed.\`
Well, now let's put a description on it.
> \`${prefix}embed edit example description This description looks very cute\`
Let's put an image on it and we will have a simple embed, be careful and put links that really contain images. In this case we will put a funny gif.
> \`${prefix}embed edit example image https://i.imgur.com/mXOijAT.gif\`
Finally, let's put a color which has to be in hexadecimal code without the #, if you don't know them, you can see the colors [here](https://htmlcolorcodes.com/es/).
> \`${prefix}embed edit example color e658ff\`
Ready, this is a simple embed that if you want you can test yourself with:
> \`${prefix}embed preview example`)
                        .addField('Send it for welcomes/leaves', `Remember that in any case you would use: {embed:[embed name]}
> In this case: \`{embed:example}\`
To insert it in a welcome or leave, there are three options:
- Message and embed:
> \`${prefix}welcome message Welcome user! | {embed:example}\`
- Message only:
> \`${prefix}welcome message Welcome user!\`
- Or just the embed:
> \`${prefix}welcome message {embed:example}\``)
                        .addField('**VARIABLES**', `First of all, what are variables? Well, for that I am, the variables will allow us to do "automated" things so that they can be replaced by names, channels, links and others, they can be used in embeds as well as in text, for welcomes, leaves and custom commands. Here are some:
\`{user}\` - @Mention (e.j. @Aviii.#0721)
\`{server}\` - Server name (e.j. ${client.user!.username}'s Support)
You can find the full list with \`${prefix}variables\``)
                        .setTimestamp()
                        .setFooter('<> Optional | [] Required'),
                    embedCreated: (embed) => `Embed with name ${embed} created successfully.
Use \`a?embed properties\` to see how to modify it.`,
                    embedDeleted: (embed) => `Embed with name ${embed} deleted successfully`,
                    embedList: (embeds, serverIcon) => new MessageEmbed()
                        .setAuthor('Server embeds', serverIcon)
                        .setDescription(embeds || 'This server doesn\'t has any embed.'),
                    embedEdited: (property, embedName) => `The **${property}** property of the embed a was edited correctly.
You can add the embed to welcome, leave or tags (custom commands) with \`{embed:${embedName}}\`.
**__Preview of the embed:__**`,
                    embedProperties: () => new MessageEmbed()
                        .addField('Properties of an embed', `> \`author\` - [text | <Image link>]
> \`thumbnail\` - [Image link]
> \`title\` - [text]
> \`description\` - [text]
> \`footer\` - [text | <Image link>]
> \`image\` - [Image link]
> \`color\` - [Hex Code]
> \`timestamp\` - [yes/no]`)
                        .setFooter('<> Optional | [] Required')
                        .setTimestamp(),
                    tagsHelp: (prefix) => new MessageEmbed()
                        .setDescription(`You must specify a valid option.
> \`${prefix}tag create [Name] [Properties]\`
> \`${prefix}tag edit [Name] [Properties]\`
> \`${prefix}tag delete [Name]\`

To see all tags in the server use:
> \`${prefix}tag list\`

To see the properties use:
> \`${prefix}tag properties\`

To use a tag, use:
> \`${prefix}[tag name]\``),
                    tagsCreated: (tagName) => `Tag with the name **${tagName}** created successfully.`,
                    tagsEdited: (tagName) => `Tag with the name **${tagName}** edited successfully.`,
                    tagsDeleted: (tagName) => `Tag with the name **${tagName}** deleted successfully.`,
                    tagsList: (tags, icon) => new MessageEmbed()
                        .setAuthor('Server tag list', icon)
                        .setDescription(tags || 'This server doesn\'t has any tag.'),
                    tagsProperties: () => new MessageEmbed()
                        .addField('**Properties of a tag**', `
> \`(message:[Text])\` - The normal text of the message to send.
> \`(image:[URL])\` - Send an image as attachment.
> \`{embed:[Embed Name]}\` - Send an embed already created (embed command).
> \`{addRole:[RoleID]}\` - Adds a role (put another \\*:roleID\\* to add one more role).
> \`{removeRole:[RoleID]}\` - Removes a role (put another \\*:roleID\\* to remove one more role).`),
                    welcomeHelp: (prefix) => new MessageEmbed()
                        .setDescription(`You must specify a valid property.
> \`${prefix}welcome channel [#Canal]\`
> \`${prefix}welcome message [ <Text> | {embed[embed name]} ]\`
> \`${prefix}welcome autorole [user|bot] [@Role | Role ID |]\`
To insert a message or embed, there are three options:
- Message and embed:
> \`${prefix}welcome message Welcome {user}! | {embed:[embed name]}\`
- Message only:
> \`${prefix}welcome message Welcome {user}!\`
- Or just the embed:
> \`${prefix}welcome message {embed:[embed name]}\`
If you need to delete any property use:
> \`${prefix}welcome [property] null\``)
                        .setFooter(`You can see the configuration using: ${prefix}welcome config`),
                    leaveHelp: (prefix) => new MessageEmbed()
                        .setDescription(`You must specify a valid property.
> \`${prefix}leave channel [#Channel | null]\`
> \`${prefix}leave message  [<Text>| {embed[embed name]} ]\`
To insert messages into a leave, there are three options:
- Message and embed:
> \`${prefix}leave message A user left the server! | {embed:[embed name]}\`
- Message only:
> \`${prefix}leave message A User left the server!\`
- Or just the embed:
> \`${prefix}leave message {embed:[embed name]}\`
If you need to delete any property use:
> \`${prefix}leave [property] null\``)
                        .setFooter(`You can see the configuration using: ${prefix}leave config`),
                    welcomeChannel: (channel) => `The welcomes channel is now ${channel}.`,
                    leaveChannel: (channel) => `The leaves channel is now ${channel}.`,
                    channelRemoved: () => 'The channel was successfully removed.',
                    messageRemoved: () => 'The message was successfully deleted.',
                    welcomeEmbed: (prefix, embed) => `The new embed to use in the welcomes is now **${embed}**. To test it use: \`${prefix}emit welcome\`.`,
                    leaveEmbed: (prefix, embed) => `The new embed to use in the leaves is now **${embed}**. To test it use: \`${prefix}emit leave\`.`,
                    welcomeMessage: (prefix, embed) => `The message ${embed ? 'and embed ' : ''}of welcomes has been updated correctly. To test it use: \`${prefix}emit welcome\`.`,
                    leaveMessage: (prefix, embed) => `The message ${embed ? 'and embed ' : ''}of leaves has been updated correctly. To test it use: \`${prefix}emit leave\`.`,
                    welcomeRoleRemoved: (option) => `A role will not be given now when a ${option} joins the server.`,
                    welcomeRole: (role, option, prefix) => `Now, the role **${role}** will be given when a ${option} joins the server. To test it use: \`${prefix}emit welcome\``,
                    welcomeConfig: (welcome, prefix) => {
                        const configEmbed = new MessageEmbed()
                            .setTitle('Server Welcome Configuration')
                            .setDescription(`**Channel:** ${welcome.channelID ? `<#${welcome.channelID}>` : 'Doesn\'t have.'}
**User AutoRole:** ${welcome.autorole.user ? `<@&${welcome.autorole.user}>` : 'Doesn\'t have.'}
**Bot AutoRole:** ${welcome.autorole.bot ? `<@&${welcome.autorole.bot}>` : 'Doesn\'t have.'}
**Embed Name:** ${welcome.embedName ? welcome.embedName : 'Doesn\'t have.'}`)
                            .addField('Message:', `${welcome.message ? welcome.message.length > 1024 ? `${welcome.message.substring(0, 1000)}. And more..` : welcome.message : 'Doesn\'t have.'}`);
                        if (welcome.embedName)
                            configEmbed.setFooter(`If you want to see the embed use: ${prefix}embed preview ${welcome.embedName}`);
                        return configEmbed;
                    },
                    leaveConfig: (leave, prefix) => {
                        const configEmbed = new MessageEmbed()
                            .setTitle('Server Welcome Configuration')
                            .setDescription(`**Channel:** ${leave.channelID ? `<#${leave.channelID}>` : 'Doesn\'t have.'}
**Embed Name:** ${leave.embedName ? leave.embedName : 'Doesn\'t have.'}`)
                            .addField('Message:', `${leave.message ? leave.message.length > 1024 ? `${leave.message.substring(0, 1000)}. And more..` : leave.message : 'Doesn\'t have.'}`);
                        if (leave.embedName)
                            configEmbed.setFooter(`If you want to see the embed use: ${prefix}embed preview ${leave.embedName}`);
                        return configEmbed;
                    },
                    emitEvent: (event) => `Emitted **${event}** event successfully.`,
                    variables: () => new MessageEmbed()
                        .setTitle(`${client.user!.username} Variables`)
                        .setDescription('These variables can be used when editing embeds, in welcomes/leaves messages, and custom commands (tags).')
                        .addField('User Information',
                            `\`{user}\` - @Mention (e.j. @Aviii.#0721 ❤️)
\`{user.name}\` - Username (e.j. Aviii.)
\`{user.discrim}\` - User tag (e.j. 0721)
\`{user.nick}\` - Member's nickname, if none, it will show 'No nickname.'
\`{user.createdate}\` - Account creation date
\`{user.joindate}\` - Date you joined the server
\`{user.id}\` - User ID (e.j. 710880777662890095)
\`{user.avatar}\` - Link to the user avatar`)
                        .addField('Server Information',
                            `\`{server}\` - Server name (e.j. ${client.user!.username}'s Support)
\`{server.prefix}\` - Server prefix (by default, a?)
\`{server.id}\` - Server ID (e.j. 773629394894848030)
\`{server.membercount}\` - Number of total members
\`{server.membercount.nobots}\` - Number of total members (no bots)
\`{server.membercount.bots}\` - Number of total members (bots)
\`{server.rolecount}\` - Number of roles
\`{server.channelcount}\` - Number of channels
\`{server.channelcount.voice}\` - Number of voice channels
\`{server.emojiscount}\` - Number of total emojis
\`{server.emojiscount.animate}\` - Number of animated emojis
\`{server.emojiscount.noanimate}\` - Number of non-animated emojis
\`{server.createdate}\` - Server creation date
\`{server.boostlevel}\` - Boost level of the server
\`{server.boostcount}\` - Number of boosts in the server
\`{server.icon}\` - Link to the server icon`)
                        .addField('Server Owner Information',
                            `\`{server.owner}\` - @Mention to the owner (e.j. @Aviii.#0721)
\`{server.owner.id}\` - Owner ID (e.j. 710880777662890095)
\`{server.owner.nick}\` - Owner's nickname, if none, it will show 'No nickname.'
\`{server.owner.avatar}\` - Link to the owner avatar`)
                        .addField('Channel Information',
                            `\`{channel}\` - Mention to the channel (e.j. #memes)
\`{channel.id}\` - Channel ID (e.j. 773629394894848033)
\`{channel.name}\` - Channel name (e.j. memes)
\`{channel.createdate}\` - Channel creation date`)
                        .setTimestamp(),
                    invite: () => new MessageEmbed()
                        .setDescription(`Thank you for inviting me to your server! You will not regret.
> [This is my invite link.](https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot)
In case you have any doubts, here's the invitation link from my support server.
> [Support Server](https://discord.gg/K63NqEDm86)`)
                },
                commandErrors: {
                    noImage: () => 'You must specify the URL of a valid image.',
                    noChannel: () => 'I couldn\'t find the channel or it\'s invalid.',
                    noChannelView: () => 'I don\'t have permissions to see that channel.',
                    noChannelWrite: () => 'I can\'t send messages in that channel.',
                    noRole: () => 'I couldn\'t find that role or it\'s invalid.',
                    noRoleAdd: () => 'I don\'t have enough permissions to give that role.',
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
                    sayNoText: () => 'You must specify the text that you want me to say.',
                    sayNoPerms: () => 'You must have the permission of mention everyone to execute this command.',
                    blacklist: (reason, date) => `You're on the blacklist. Here you have more information:
> **Reason:** \`${reason}\`
> **Date:** \`${date}\`
You can appeal by going to my support server.
> [Support Server](https://discord.gg/K63NqEDm86)`,
                    rrMax: () => 'You can only have 32 reaction roles per server.',
                    rrNoOption: (prefix) => `You must specify a valid option or role.
> \`${prefix}reactrole [@Role] [Type] [Message ID] <#Channel>\`
> \`${prefix}reactrole delete [Emoji] [Message ID]\`
If you need a little more help you can use: \`${prefix}reactrole help\``,
                    rrNoType: (prefix) => `That's not a type of reaction role. Use [${prefix}reactrole help] to see more about reaction roles.`,
                    rrNoChannelReactions: () => 'I don\'t have permissions to add reactions in that channel.',
                    rrNoMessage: () => 'You must specify the ID of a message.',
                    rrNoMessageFound: () => 'The message wasn\'t found.',
                    rrErrorMessage: () => 'There was an error finding the message, try again.',
                    rrNoEmoji: () => 'I couldn\'t find that emoji in my cache, try adding the emoji on the server.',
                    rrExists: () => 'There\'s already a reaction role with that emoji.',
                    rrTime: () => 'Time is over ;(, Please try again.',
                    rrDeleteNoEmoji: () => 'You must specify the emoji.',
                    rrDeleteNoMessage: () => 'You must specify the message ID.',
                    rrDeleteEmoji: () => 'You must specify a valid emoji.',
                    rrDeleteNo: () => 'The reaction role couldn\'t be deleted, check if there\'s one with that message ID and emoji in the server.',
                    embedMax: () => 'You can only have 10 embeds per server.',
                    embedName: () => 'You must specify the name of the embed and must have a maximum of 10 characters.',
                    embedExists: () => 'There\'s already an embed with that name. Try another.',
                    embedNoExists: () => 'There\'s no embed with that name or you didn\'t specify one.',
                    embedNoValue: (property) => `You must put the text to put as ${property}.`,
                    embedMaxCharacters: (property, max) => `The **${property}** must have ${max} characters or less.`,
                    embedNoTimestamp: () => 'You must specify if you want the timestamp (yes/no).',
                    embedNoColor: () => 'You must specify the color without #.',
                    embedNoProperty: (prefix) => `The property that you put isn't valid.
You can see the list of the propertsies with \`${prefix}embed properties\`.`,
                    tagsMax: () => 'You can only have 10 tags per server.',
                    tagsName: () => 'You must specify the name of the tag and must have a maximum of 10 characters.',
                    tagsExists: () => 'There\'s already an tag with that name. Try another.',
                    tagsNoMessage: () => 'You must specify a message, embed or image to send or all three.',
                    tagsNoRolePerms: () => 'I don\'t have enough permissions to add or remove roles.',
                    tagsNoRole: () => 'I can\'t add or remove the roles you have specified or they don\'t exist.',
                    tagsNoExists: () => 'There\'s no tag with that name or you didn\'t specify one.',
                    tagsNoCommand: () => 'You can\'t create a tag with the name of a command.',
                    welcomeNoMessage: () => 'You must specify a welcome message.',
                    leaveNoMessage: () => 'You must specify a welcome message.',
                    welcomeRoleType: () => 'You must specify the type of user that will receive the role (user/bot)',
                    emitNoEvent: () => 'You must specify the event to test.'
                },
                commandDescriptions: {
                    help: 'Displays helpful links and help for the bot.',
                    eval: 'Evaluates code.',
                    ping: 'Shows the latency of the bot.',
                    prefix: 'Lets you set a custom prefix on your server.',
                    guilds: 'Shows the guild count and users I have.',
                    say: 'I say everything that you want.',
                    avatar: 'Gets the avatar of any user.',
                    vote: 'Shows the Top.gg link to vote for me.',
                    lang: 'Changes the language on your server for a more pleasant environment.',
                    bl: 'Adds an user to the blacklist.',
                    reactrole: 'Lets you establish roles with a specific emoji in the message you want, works for colored roles, roles for mentions. Everything is possible!',
                    embed: 'Lets you create custom embeds for your tags, welcomes and leaves. You do the design!',
                    tags: 'Lets you create custom commands (tags) that can send messages, photos and add or delete roles. Everything is possible!',
                    welcome: 'Configure the channel, messages, and roles that you prefer the most when someone joins your server c:',
                    leave: 'Set the channel and messages you prefer when someone leaves your server>: c',
                    emit: 'Do a simulation of events in the bot.',
                    variables: 'Look at the different types of variables that you can use with the bot.'
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