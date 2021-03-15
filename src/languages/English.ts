import Language from '../structures/Language';
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
                    category: (prefix: string, category: 'config' | 'general' | 'developer'): string => {
                        const categories = {
                            "config": "**Config** <:config:820788840654307348>",
                            "general": "**General** <:general:820791014872449055>",
                            "developer": "**Developer**"
                        }
                        const commands = client.commands.filter((c) => c.category.toLowerCase() == category)
                        return `**Commands in the category:** ${categories[category]}
This category has \`${commands.size}\` commands.
If you need more detailed information about each command, you can use:
> \`${prefix}help <Command>\`
**List of commands:**
\`\`\`
${Array(Math.ceil(commands.array().length / 4)).fill([]).map((_, i) => commands.array().map((c) => c.name).slice(i * 4, (i * 4) + 4)).map((l) => l.map((c) => c.padEnd(17, ' ')).join('').trim()).join('\n')}
\`\`\``
                    },
                    command: (prefix: string, command: string): string => {
                        const findCom = this.client.commands.get(command)
                        return `__**${findCom?.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())} Command**__
**Description:** ${findCom?.description ? findCom?.description : 'No description.'}
**Aliases:** ${findCom?.aliases[0] ? findCom?.aliases.join(' | ') : 'No aliases.'}
**Category:** ${findCom?.category}
**Usage:** ${findCom?.usage(prefix)}
**Example:** ${findCom?.example(prefix)}
\`\`\`diff
In maintenance?: ${findCom?.enabled ? 'No.' : 'Yes.'}
Servers Only?: ${findCom?.guildOnly ? 'Yes' : 'No.'}
NSFW Only?: ${findCom?.nsfwOnly ? 'Yes.' : 'No.'}
Developers Only?: ${findCom?.devsOnly ? 'Yes.' : 'No.'}

Bot Permissions:
> Guild: ${findCom?.botGuildPermissions[0] ? `\n+ ${findCom?.botGuildPermissions.map(findCom?.parsePermission).join('\n+')}` : 'Doesn\'t need.'}
> Channel: ${findCom?.botChannelPermissions[0] ? `\n+ ${findCom?.botChannelPermissions.map(findCom?.parsePermission).join('\n+')}` : 'Doesn\'t need.'}

Member Permissions:
> Guild: ${findCom?.memberGuildPermissions[0] ? `\n+ ${findCom?.memberGuildPermissions.map(findCom?.parsePermission).join('\n+')}` : 'Doesn\'t need.'}
> Channel: ${findCom?.memberChannelPermissions[0] ? `\n+ ${findCom?.memberChannelPermissions.map(findCom?.parsePermission).join('\n+')}` : 'Doesn\'t need.'}
\`\`\`
`
                    },
                    noHelp: `> The command or category couldn't be found.`
                }
            }
        })
    }
}