/* eslint-disable max-lines */
import { Guild, MessageEmbed } from 'discord.js';
import Language from '../structures/Language';
import ms = require('@fabricio-191/ms');
import Agness from '../bot';

export default class English extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'en',
            flag: '🇺🇸',
            nativeName: 'English',
            strings: {
                commands: {
                    /* General */
                    channelRemoved: () => 'The channel was successfully removed.',
                    messageRemoved: () => 'The message was successfully deleted.',
                    waiting: () => 'This may take a while.',
                    reasonDays: (reason, days) => `${reason ? `**Reason:** ${reason}\n` : ''}${days ? `**Days:** ${days}` : ''}`,

                    /* help */
                    help: (prefix) => `<:world:820783752489074748> **${client.user!.username} Help Panel**
Hi! At the moment I have **6** categories and **${client.commands.size - client.commands.filter(c => c.category === 'Developer').size}** commands.
**Categories:**
> \`${prefix}help Config\` • Configuration Commands <:DiscordStaff:830458954927570974>  
> \`${prefix}help General\` • Useful Commands <a:ALsaludo:809942573065699338>
> \`${prefix}help Mod\` • Moderation Commands <:modHammer:835631758053605403>
> \`${prefix}help Fun\` • Funny commands <:ALwaiting:823673033625436210>
> \`${prefix}help Reaction\` • Expressive commands <:ALsadChamp:823671653694832681>
> \`${prefix}help Interact\` • Interactive commands <a:kill:832357744123576361>
> \`${prefix}help NSFW\` • Commands NSFW +18 <:nsfw:832630274587361281>
**Do you need more help?**
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**Links**
**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/K63NqEDm86) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, category, commands, quantity) => {
                        const categories = {
                            Config: '**Config** <:DiscordStaff:830458954927570974>',
                            General: '**General** <a:ALsaludo:809942573065699338>',
                            Fun: 'Fun <a:kill:832357744123576361>',
                            Reaction: 'Reaction <:ALsadChamp:823671653694832681>',
                            Interact: 'Interact <a:kill:832357744123576361>',
                            NSFW: 'NSFW <:nsfw:832630274587361281>',
                            Developer: '**Developer**',
                            Mod: 'Mod <:modHammer:835631758053605403>'
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
${this.getDescription(command.name) ? `**\`Description:\`**\n${this.getDescription(command.name)}` : ''}
**\`Aliases:\`** ${command.aliases.join(' | ') || 'No aliases.'}
**\`Category:\`** ${command.category}
**\`Cooldown:\`** ${ms(command.cooldown * 1000, { long: true })}
**\`Usage:\`** ${command.usage(prefix)}
**\`Example:\`** ${command.example(prefix)}
\`\`\`diff
In maintenance?: ${command.enabled ? 'No.' : 'Yes.'}
Servers Only?: ${command.guildOnly ? 'Yes' : 'No.'}
NSFW Only?: ${command.nsfwOnly ? 'Yes.' : 'No.'}
Developers Only?: ${command.devsOnly ? 'Yes.' : 'No.'}
\`\`\`
> **Bot Permissions:**
\`\`\`diff
> Guild:
${command.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
\`\`\`
> **Member Permissions:**
\`\`\`diff
> Guild:
${command.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
> Channel:
${command.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'Doesn\'t need.'}
\`\`\``;
                    },

                    /* prefix */
                    prefix: (prefix) => `My new prefix is: \`${prefix}\``,

                    /* lang */
                    langs: (languages) => `There're the languages currently available in Agness.
**If you want to change the language of Agness on the server react with the respective emoji.**

${languages}`,
                    langsSet: () => '<:right:830079699803701259> Language set to English.',

                    /* General category */
                    guilds: (members, guilds, shardID) => new MessageEmbed()
                        .setDescription(`At this moment, I'm in **${guilds}** servers and with **${members}** users.`)
                        .setFooter(`This server is on the shard ${shardID}`),
                    vote: () => new MessageEmbed()
                        .setDescription(`I really appreciate that you want to vote for me!
[Vote for me here!](https://top.gg/bot/798573830645874718)
Remember that you can vote every 12 hours.`)
                        .setFooter('With love ❤️'),
                    avatar: (user, avatar) => `**${user}**'s avatar
> [Avatar Link](${avatar})`,
                    variables: () => new MessageEmbed()
                        .setTitle(`${client.user!.username} Variables`)
                        .setDescription('These variables can be used when editing embeds, in welcomes/leaves messages, and custom commands (tags).')
                        .addField('User Information',
                            `\`{user}\` - @Mention (e.j. @Aviii.#0721)
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
> [Support Server](https://discord.gg/K63NqEDm86)`),
                    userInfo: (user, guild, author) => {
                        const flags = {
                            DISCORD_EMPLOYEE: '<:DiscordStaff:830458954927570974>',
                            PARTNERED_SERVER_OWNER: '<:partner:830458955666423829>',
                            HYPESQUAD_EVENTS: '<:HypeSquadEvents:830458955134271560>',
                            BUGHUNTER_LEVEL_1: '<:BugHunter1:830458954089365564>',
                            HOUSE_BRAVERY: '<:Bravery:830458952730279980>',
                            HOUSE_BRILLIANCE: '<:Brilliance:830458953611477013>',
                            HOUSE_BALANCE: '<:Balance:830458952503787571>',
                            EARLY_SUPPORTER: '<:EarlySupporter:830458955234672663>',
                            TEAM_USER: '<:TeamUser:830464435914407948>',
                            SYSTEM: '<:System:830462197036875829>',
                            BUGHUNTER_LEVEL_2: '<:BugHunter2:830458954541826138>',
                            VERIFIED_BOT: '<:VerifiedBot:830462197503229952>',
                            EARLY_VERIFIED_BOT_DEVELOPER: '<:dev:830458954857185310>'
                        };
                        let member;
                        if (guild) member = (guild as Guild).members.cache.get(user.id);
                        let badges = user.flags?.toArray().length ? user.flags?.toArray().map(x => flags[x]).join(' ') : 'Doesn\'t have.';
                        if (member) badges = `${guild?.ownerID === member.id ? `<:Owner:830458955545051167> ${user.flags?.toArray().map(x => flags[x]).join(' ')}` :
                            user.flags?.toArray().length ? user.flags?.toArray().map(x => flags[x]).join(' ') : 'Doesn\'t have.'}`;
                        return new MessageEmbed()
                            .setTitle(`${user.username}'s Information`)
                            .setThumbnail(user.displayAvatarURL({ size: 4096, dynamic: true }))
                            .setDescription(`**ID:** ${user.id}
**Tag:** ${user.tag}
**Mention:** ${user.toString()} ${user.bot ? '| <:bot:830462923590598736>' : ''}
**Badges:** ${badges}
**Last Message:** ${user.lastMessage ? `[Click here](${user.lastMessage?.url})` : 'I did not find it.'}
**Joined Discord:** ${user.createdAt.toLocaleString('en-US', { timeZoneName: 'short', timeZone: 'America/Lima' })}
${member ? `**Joined the server:** ${member.joinedAt?.toLocaleString('en-US', { timeZoneName: 'short', timeZone: 'America/Lima' })}` : ''}`)
                            .setFooter(`(◍•ᴗ•◍)❤️ Requested by: ${author.tag}`, author.displayAvatarURL({ format: 'webp', size: 4096, dynamic: true }));
                    },
                    /* reaction role */
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

                    /* embeds */
                    embedHelp: (prefix) => new MessageEmbed()
                        .setTitle('Why do I need an embed?')
                        .setDescription('You may need it to make your server look much better aesthetically, as it will allow you to create rich text, which you can put in your welcomes and custom commands. Creativity is up to you!')
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
                    embedCreated: (prefix, embed) => `Embed with name ${embed} created successfully.
Use \`${prefix}embed properties\` to see how to modify it.`,
                    embedDeleted: (embed) => `Embed with name ${embed} deleted successfully`,
                    embedList: (embeds, serverIcon) => new MessageEmbed()
                        .setAuthor('Server embeds', serverIcon)
                        .setDescription(embeds || 'This server doesn\'t has any embed.'),
                    embedEdited: (property, embedName) => `The **${property}** property of the embed a was edited correctly.
You can add the embed to welcome, leave or tags (custom commands) with \`{embed:${embedName}}\`.
**__Preview of the embed:__**`,
                    embedProperties: (prefix) => new MessageEmbed()
                        .addField('Properties of an embed', `> \`author\` - [text | <Image link>]
> \`thumbnail\` - [Image link]
> \`title\` - [text]
> \`description\` - [text]
> \`footer\` - [text | <Image link>]
> \`image\` - [Image link]
> \`color\` - [Hex Code]
> \`timestamp\` - [yes/no]

Use: \`${prefix}embed edit [name] [property] [value]\` to edit your embed.`)
                        .setFooter('<> Optional | [] Required')
                        .setTimestamp(),

                    /* tags */
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

                    /* welcome */
                    welcomeHelp: (prefix) => new MessageEmbed()
                        .setDescription(`You must specify a valid property.
> \`${prefix}welcome channel [#Channel | null]\`
> \`${prefix}welcome message [ <Text> | {embed:[embed name]} ]\`
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
                    welcomeChannel: (channel) => `The welcomes channel is now ${channel}.`,
                    welcomeEmbed: (prefix, embed) => `The new embed to use in the welcomes is now **${embed}**. To test it use: \`${prefix}emit welcome\`.`,
                    welcomeMessage: (prefix, embed) => `The message ${embed ? 'and embed ' : ''}of welcomes has been updated correctly. To test it use: \`${prefix}emit welcome\`.`,
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
                    /* leave */
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
                    leaveChannel: (channel) => `The leaves channel is now ${channel}.`,
                    leaveEmbed: (prefix, embed) => `The new embed to use in the leaves is now **${embed}**. To test it use: \`${prefix}emit leave\`.`,
                    leaveMessage: (prefix, embed) => `The message ${embed ? 'and embed ' : ''}of leaves has been updated correctly. To test it use: \`${prefix}emit leave\`.`,
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

                    /* emit */
                    emitEvent: (event) => `Emitted **${event}** event successfully.`,

                    /* interact */
                    kill: (author, mention) => {
                        const frases = [
                            `**${author} has killed ${mention}.**`,
                            `**${mention} has been killed by ${author}.**`,
                            `**${mention} died at the hands of ${author}** D:`,
                            `**${author} destroyed ${mention}.**`,
                            `**${mention} has gone to heaven thanks to ${author}.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    smug: (author) => {
                        const frases = [
                            `**${author} boasts of himself**`,
                            `**${author} will always be the best.**`,
                            `**Everyone look at how ${author} boasts.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    disgust: (author) => {
                        const frases = [
                            `**${author} doesn't like it at all 🤮**`,
                            `**${author} would rather kill himself :(**`,
                            `**No, for ${author} it's not nice.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    laugh: (author) => {
                        const frases = [
                            `**Look how ${author} laughs out loud.**`,
                            `**${author}  is dying of laughter 😆**`,
                            `**Look at the laugh of ${author} :D**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    baka: (author, mention) => {
                        const frases = [
                            `**${author} says baka to ${mention}**`,
                            `**${mention} baka baka baka** *said by ${author}**`,
                            `**${author} says ${mention} is baka D:**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    slap: (author, mention) => {
                        const frases = [
                            `**${author} slaps ${mention}** D:`,
                            `**${mention} gets a strong slap from ${author}*`,
                            `**${author} keeps slapping ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    hug: (author, mention) => {
                        const frases = [
                            `**${author} hugs ${mention}** D:`,
                            `**${mention} receives a warm hug from ${author}**`,
                            `**${author} does not release ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    cuddle: (author, mention) => {
                        const frases = [
                            `**${author} cuddles ${mention}** D:`,
                            `**${author} caresses ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    pat: (author, mention) => {
                        const frases = [
                            `**${author} pats ${mention}** :3`,
                            `**${mention} gets pats from ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    kiss: (author, mention) => {
                        const frases = [
                            `**${author} gave ${mention} a kiss** -w-`,
                            `**${mention} got a kiss from ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    feed: (author, mention) => {
                        const frases = [
                            `**${author} has fed ${mention}** .w.`,
                            `**${mention}  has eaten thanks to ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },

                    /* images */
                    dog: () => 'Look at a puppy! :3 ❤️',
                    cat: () => 'Did you want a cute cat? 🥰',
                    bunny: () => 'This is a beautiful bunny 😋',
                    duck: () => 'Did someone say duck? 🦆',

                    /* nsfw */
                    nsfw: () => 'I hope you enjoy 🕵️‍♂️',
                    nsfwRequest: (author) => `Requested by: ${author.tag}`,

                    /* purge */
                    purgeNothing: () => 'I didn\'t find anything to delete in the last 100 messages.',
                    purge: (messages) => `<:right:830079699803701259> I have deleted **${messages}** message(s) successfully.`,

                    /* kick */
                    kickCheck: () => 'was kicked.',

                    /* ban */
                    banCheck: () => 'was banned.',

                    /* unban */
                    unbanOK: (user) => `**${user}** has been removed from the ban list.`

                },
                commandErrors: {
                    
                    /* General */
                    noImage: () => 'You must specify the URL of a valid image.',
                    noChannel: () => 'I couldn\'t find the channel or it\'s invalid.',
                    noChannelView: () => 'I don\'t have permissions to see that channel.',
                    noChannelWrite: () => 'I can\'t send messages in that channel.',
                    noRole: () => 'I couldn\'t find that role or it\'s invalid.',
                    noRoleAdd: () => 'I don\'t have enough permissions to give that role.',
                    reasonInvalid: () => 'You must specify the reason for the ban if you want it to have one: `--reason "[ reason ]"`',
                    reasonNoComillas: () => 'You have to use the quotation marks "" to give the reason : `--reason "[ reason ]"`',

                    /* Command CanRun */
                    cmdServer: () => 'This command is only available for servers.',
                    cmdCooldown: (cooldown) => `You have to wait **${cooldown}s** to execute this command.`,
                    cmdEnabled: () => 'This command is under maintenance.',
                    cmdNSFW: () => 'This command can only be used on NSFW channels.',
                    cmdMemberGuild: (perms) => `You need the following permissions:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdMemberChannel: (perms) => `You need the following permissions on this channel:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotGuild: (perms) => `I need the following permissions:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotChannel: (perms) => `I need the following permissions on this channel:\n\`\`\`diff\n${perms}\n\`\`\``,

                    /* prefix */
                    prefixArgs: () => 'You must specify the new prefix.',
                    prefixLength: () => 'The new prefix must not exceed 5 characters.',

                    /* lang */
                    langNo: () => 'You must specify a valid language.',

                    /* help */
                    helpNo: () => '> The command or category couldn\'t be found.',

                    /* say */
                    sayNoText: () => 'You must specify the text that you want me to say.',
                    sayNoPerms: () => 'You must have the permission of mention everyone to execute this command.',

                    /* blacklist */
                    blacklist: (reason, date) => `You're on the blacklist. Here you have more information:
> **Reason:** \`${reason}\`
> **Date:** \`${date}\`
You can appeal by going to my support server.
> [Support Server](https://discord.gg/K63NqEDm86)`,

                    /* reaction role */
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
                    cooldownReactionAdd: (coldoown) => `You have to wait **${coldoown}s** to get the next role.`,
                    cooldownReactionRemove: (coldoown) => `You have to wait **${coldoown}s** to remove the next role.`,

                    /* embeds */
                    embedMax: () => 'You can only have 10 embeds per server.',
                    embedName: () => 'You must specify the name of the embed and must have a maximum of 10 characters.',
                    embedExists: () => 'There\'s already an embed with that name. Try another.',
                    embedNoExists: () => 'There\'s no embed with that name or you didn\'t specify one.',
                    embedNoValue: (property) => `You must put the text to put as ${property}.`,
                    embedNoValues: (prefix, embed) => `It seems that your embed is empty. I can't send it. Fill it with \`${prefix}embed edit ${embed} [property]\``,
                    embedMaxCharacters: (property, max) => `The **${property}** must have ${max} characters or less.`,
                    embedNoTimestamp: () => 'You must specify if you want the timestamp (yes/no).',
                    embedNoColor: () => 'You must specify the color without #.',
                    embedNoProperty: (prefix) => `The property that you put isn't valid.
You can see the list of the propertsies with \`${prefix}embed properties\`.`,

                    /* tags */
                    tagsMax: () => 'You can only have 10 tags per server.',
                    tagsName: () => 'You must specify the name of the tag and must have a maximum of 10 characters.',
                    tagsExists: () => 'There\'s already an tag with that name. Try another.',
                    tagsNoMessage: () => 'You must specify a message, embed or image to send or all three.',
                    tagsNoRolePerms: () => 'I don\'t have enough permissions to add or remove roles.',
                    tagsNoRole: () => 'I can\'t add or remove the roles you have specified or they don\'t exist.',
                    tagsNoExists: () => 'There\'s no tag with that name or you didn\'t specify one.',
                    tagsNoCommand: () => 'You can\'t create a tag with the name of a command.',

                    /* welcome */
                    welcomeNoMessage: () => 'You must specify a welcome message.',
                    welcomeRoleType: () => 'You must specify the type of user that will receive the role (user/bot)',

                    /* leave */
                    leaveNoMessage: () => 'You must specify a welcome message.',

                    /* emit */
                    emitNoEvent: () => 'You must specify the event to test.',

                    /* interact */
                    killNoMention: () => 'Who do you want to kill? *walks away* (~_~;)',
                    killMentionMe: () => 'No- Not me please ;w;',
                    killMentionAuthor: () => 'You can\'t kill yourself >:c',
                    bakaNoMention: () => 'Mention who you want to say baka  owo',
                    bakaMentionMe: () => 'I\'m not baka, you are D:',
                    bakaMentionAuthor: () => 'Are you baka? okey- ;-;',
                    slapNoMention: () => 'Mention who you want to slap ^w^',
                    slapMentionMe: () => 'No- don\'t slap me  D:',
                    slapMentionAuthor: () => 'I\'m sure you don\'t want to do that  e.e',
                    hugNoMention: () => 'Who do you want to hug? :3',
                    hugMentionAuthor: () => 'You can\'t hug yourself, sorry-',
                    cuddleNoMention: () => 'Mention who you want to cuddle u.u',
                    cuddleMentionAuthor: () => 'Hmm.. You can not do that :(',
                    patNoMention: () => 'Mention the person who will receive your patties c:',
                    patMentionAuthor: () => 'You can\'t caress yourself D:',
                    kissNoMention: () => 'Mention who you want to kiss 7w7',
                    kissMentionAuthor: () => 'Hmm.. you can\'t kiss yourself  ._.',
                    feedNoMention: () => 'Mention who you want to feed  .w.',
                    feedMentionAuthor: () => 'Hmm.. Mention someone other than you  e.e',

                    /* purge */
                    purgeNoArgs: (prefix) => new MessageEmbed()
                        .setTitle('Modes of use.')
                        .setDescription(`${prefix}purge [ amount ]
${prefix}purge bots [ amount ]
${prefix}purge user [ amount ] [ @mentions | IDs ]
${prefix}purge embeds [ amount ]
${prefix}purge attachments [ amount ]`),
                    purgeNoNumber: () => 'You must specify a valid number or type.',
                    purgeNoValid: () => 'You must specify a number from 1 to 100.',
                    purgeNoUsers: () => 'Mention users or specify their IDs',

                    /* kick */
                    kickNoArgs: () => 'You must specify which members you want to kick.',
                    kickNoUsers: () => 'Invalid user(s). Please be sure to mention someone and that they can be kicked by both of you.',
                    kickError: () => 'was not kicked.',
                    kickUsersMax: () => 'You can only kick 20 users at a time.',

                    /* ban */
                    banNoArgs: () => 'You must specify which members you want to ban.',
                    banNoUsers: () => 'Invalid user(s). Please be sure to mention someone and they can be banned by both of you.',
                    banError: () => 'was not banned.',
                    banUsersMax: () => 'You can only ban 20 users at a time.',
                    banDaysInvalid: () => 'You must specify a valid number of days from 1 to 7 if you want a temporary ban: `--days [ 1 - 7 ]`',

                    /* unban */
                    unbanNoUser: () => 'You must specify the user you want to revoke the ban from.',
                    unbanUserNoBan: () => 'This user is not on the ban list.',
                    unBanNo: (user) => `I couldn't remove **${user}** from the ban list.`
                },
                commandDescriptions: {

                    /* General */
                    avatar: 'Gets the avatar of any user.',
                    djs: 'Search the documentation for Discord.js',
                    guilds: 'Shows the guild count and users I have.',
                    help: 'Displays helpful links and help for the bot.',
                    invite: 'I will give you my invitations.',
                    ping: 'Shows the latency of the bot.',
                    say: 'I say everything that you want.',
                    userinfo: 'See useful information of any user.',
                    variables: 'Look at the different types of variables that you can use with the bot.',
                    vote: 'Shows the Top.gg link to vote for me.',

                    /* Config */
                    embed: 'Lets you create custom embeds for your tags, welcomes and leaves. You do the design!',
                    emit: 'Do a simulation of events in the bot.',
                    lang: 'Changes the language on your server for a more pleasant environment.',
                    leave: 'Set the channel and messages you prefer when someone leaves your server>: c',
                    prefix: 'Lets you set a custom prefix on your server.',
                    reactrole: 'Lets you establish roles with a specific emoji in the message you want, works for colored roles, roles for mentions. Everything is possible!',
                    tags: 'Lets you create custom commands (tags) that can send messages, photos and add or delete roles. Everything is possible!',
                    welcome: 'Configure the channel, messages, and roles that you prefer the most when someone joins your server c:',

                    /* Mod */
                    ban: 'Ban those who deserve it.',
                    kick: 'Kick bad people on your server.',
                    purge: 'Delete messages with different options.',
                    unban: 'Remove the ban from the users you prefer.',

                    /* Developer */
                    eval: 'Evaluates code.',
                    bl: 'Adds an user to the blacklist.'

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
                    MANAGE_EMOJIS: 'Manage Emojis',
                    REQUEST_TO_SPEAK: 'Reques to speak'
                }
            }
        });
    }
}