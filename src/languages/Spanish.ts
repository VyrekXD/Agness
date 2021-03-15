import Language from '../structures/Language';
import Agness from '../bot';

export default class Spanish extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'es',
            displayName: 'Spanish',
            strings: {
                commands: {
                    help: (prefix: string): string => `<:world:820783752489074748> **Panel de ayuda de ${client.user?.username}**
¡Hola! En este momento cuento con **2** categorias y **${client.commands.size}** comandos.

**Categorias:**
> \`${prefix}help Config\` • Comandos de configuración <:config:820788840654307348>
> \`${prefix}help General\` • Comandos útiles <:general:820791014872449055>
**¿Necesitas mas ayuda?**
Si necesita información más detallada sobre cada comando, puede usar:
> \`${prefix}help <Comando>\`
**Enlaces**
**[Invitacion del Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Servidor de Soporte](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    category: (prefix: string, category: 'config' | 'general' | 'developer'): string => {
                        const categories = {
                            "config": "**Configuración** <:config:820788840654307348>",
                            "general": "**General** <:general:820791014872449055>",
                            "developer": "**Developer**"
                        }
                        const commands = client.commands.filter((c) => c.category.toLowerCase() == category)
                        return `**Comandos en la categoria:** ${categories[category]}
Esta categoria tiene \`${commands.size}\` Comandos.
Si necesita información más detallada sobre cada comando, puede usar:
> \`${prefix}help <Command>\`
**Lista de comandos:**
\`\`\`
${Array(Math.ceil(commands.array().length / 4)).fill([]).map((_, i) => commands.array().map((c) => c.name).slice(i * 4, (i * 4) + 4)).map((l) => l.map((c) => c.padEnd(17, ' ')).join('').trim()).join('\n')}
\`\`\``
                    },
                    command: (prefix: string, command: string): string => {
                        const findCom = this.client.commands.get(command)
                        return `__**Comando ${findCom?.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())}**__
**Descripción:** ${findCom?.description ? findCom.description : 'No tiene descripción.'}
**Alias:** ${findCom?.aliases[0] ? findCom.aliases.join(' | ') : 'No tiene alias.'}
**Categoria:** ${findCom?.category}
**Uso:** ${findCom?.usage(prefix)}
**Ejmplo:** ${findCom?.example(prefix)}
\`\`\`diff
¿En mantenimiento?: ${findCom?.enabled ? 'No.' : 'Si.'}
¿Solo servidores?: ${findCom?.guildOnly ? 'Si' : 'No.'}
¿Solo NSFW?: ${findCom?.nsfwOnly ? 'Si.' : 'No.'}
¿Solo desarrolladores?: ${findCom?.devsOnly ? 'Si.' : 'No.'}

Permisos del Bot:
> Servidor: ${findCom?.botGuildPermissions[0] ? `\n+ ${findCom?.botGuildPermissions.map(findCom?.parsePermission).join('\n+')}` : 'No necesita'}
> Canal: ${findCom?.botChannelPermissions[0] ? `\n+ ${findCom?.botChannelPermissions.map(findCom?.parsePermission).join('\n+')}` : 'No necesita'}

Permisos del Miembro:
> Servidor: ${findCom?.memberGuildPermissions[0] ? `\n+ ${findCom?.memberGuildPermissions.map(findCom?.parsePermission).join('\n+ ')}` : 'No necesita'}
> Canal: ${findCom?.memberChannelPermissions[0] ? `\n+ ${findCom?.memberChannelPermissions.map(findCom?.parsePermission).join('\n+')}` : 'No necesita'}
\`\`\`
`
                    },
                    noHelp: `> No se pudo encontrar el comando o la categoría.`
                }
            }
        })
    }
}