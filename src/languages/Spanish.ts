import Language from '../structures/Language';
import Agness from '../bot';

export default class Spanish extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'es',
            displayName: 'Spanish',
            strings: {
                commands: {
                    help: (prefix) => `<:world:820783752489074748> **Panel de ayuda de ${client.user?.username}**
¡Hola! En este momento cuento con **2** categorias y **${client.commands.size}** comandos.

**Categorias:**
> \`${prefix}help Config\` • Comandos de configuración <:config:820788840654307348>
> \`${prefix}help General\` • Comandos útiles <:general:820791014872449055>
**¿Necesitas mas ayuda?**
Si necesita información más detallada sobre cada comando, puede usar:
> \`${prefix}help <Comando>\`
**Enlaces**
**[Invitacion del Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Servidor de Soporte](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, category) => {
                        const categories = {
                            config: '**Configuración** <:config:820788840654307348>',
                            general: '**General** <:general:820791014872449055>',
                            developer: '**Developer**'
                        };
                        const commands = client.commands.filter((c) => c.category.toLowerCase() == category);
                        return `**Comandos en la categoria:** ${categories[category]}
Esta categoria tiene \`${commands.size}\` comandos.
Si necesita información más detallada sobre cada comando, puedes usar:
> \`${prefix}help <Comando>\`
**Lista de comandos:**
\`\`\`
${Array(Math.ceil(commands.array().length / 4)).fill([]).map((_, i) => commands.array().map((c) => c.name).slice(i * 4, (i * 4) + 4)).map((l) => l.map((c) => c.padEnd(17, ' ')).join('').trim()).join('\n')}
\`\`\``;
                    },
                    helpCommand: (prefix, command) => {
                        const findCom = this.client.commands.get(command);
                        return `__**Comando ${findCom?.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())}**__
**Descripción:** ${findCom?.description || 'No tiene descripción.'}
**Alias:** ${findCom?.aliases.join(' | ') || 'No tiene alias.'}
**Categoria:** ${findCom?.category}
**Uso:** ${findCom?.usage(prefix)}
**Ejemplo:** ${findCom?.example(prefix)}
\`\`\`diff
¿En mantenimiento?: ${findCom?.enabled ? 'No.' : 'Sí.'}
¿Solo servidores?: ${findCom?.guildOnly ? 'Sí.' : 'No.'}
¿Solo NSFW?: ${findCom?.nsfwOnly ? 'Sí.' : 'No.'}
¿Solo desarrolladores?: ${findCom?.devsOnly ? 'Sí.' : 'No.'}

Permisos del bot:
> Servidor:
${findCom?.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
> Canal:
${findCom?.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}

Permisos del miembro:
> Servidor:
${findCom?.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
> Canal:
${findCom?.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
\`\`\`
`;
                    },
                    helpNo: () => '> No se pudo encontrar el comando o la categoría.'
                },
                commandErrors: {
                    cmdServer: () => 'Este comando solo está disponible para servidores.',
                    cmdCooldown: (cooldown) => `Tienes que esperar **${cooldown}s** para ejecutar este comando.`,
                    cmdEnabled: () => 'Este comando está en mantenimiento.',
                    cmdDevs: () => 'Este comando solo puede ser utilizado por los desarrolladores.',
                    cmdNSFW: () => 'Este comando solo se puede utilizar en canales NSFW.',
                    cmdMemberGuild: (perms) => `Necesita los siguientes permisos:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdMemberChannel: (perms) => `Necesita los siguientes permisos en este canal:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdBotGuild: (perms) => `Necesito los siguientes permisos:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``,
                    cmdBotChannel: (perms) => `Necesito los siguientes permisos en este canal:
\`\`\`diff
${perms.map(p => `+ ${this.parsePermission(p)}`).join('\n')}
\`\`\``
                },
                commandDescriptions: {
                    help: 'Muestra la ayuda y enlaces útiles del bot.',
                    eval: '',
                    ping: ''
                },
                permissions: {
                    ADMINISTRATOR: 'Administrador',
                    MANAGE_GUILD: 'Gestionar servidor',
                    BAN_MEMBERS: 'Banear miembros',
                    KICK_MEMBERS: 'Expulsar miembros',
                    READ_MESSAGE_HISTORY: 'Leer historial de mensajes',
                    SEND_MESSAGES: 'Enviar mensajes',
                    EMBED_LINKS: 'Insertar enlaces',
                    ADD_REACTIONS: 'Añadir Reacciones',
                    CREATE_INSTANT_INVITE: 'Crear invitaciones',
                    MANAGE_CHANNELS: 'Gestionar Canales',
                    VIEW_AUDIT_LOG: 'Ver el registro de auditoria',
                    PRIORITY_SPEAKER: 'Prioridad de palabra',
                    STREAM: 'Transmitir',
                    VIEW_CHANNEL: 'Ver canal',
                    SEND_TTS_MESSAGES: 'Enviar mensajes de texto a voz',
                    MANAGE_MESSAGES: 'Gestionar mensajes',
                    ATTACH_FILES: 'Adjuntar archivos',
                    MENTION_EVERYONE: 'Mencionar a todos',
                    USE_EXTERNAL_EMOJIS: 'Usar emojis externos',
                    VIEW_GUILD_INSIGHTS: 'Ver estadisticas del servidor',
                    CONNECT: 'Conectar',
                    SPEAK: 'Hablar',
                    MUTE_MEMBERS: 'Silenciar miembros',
                    DEAFEN_MEMBERS: 'Ensordecer miembros',
                    MOVE_MEMBERS: 'Mover miembros',
                    USE_VAD: 'Usar actividad de voz',
                    CHANGE_NICKNAME: 'Cambiar apodo',
                    MANAGE_NICKNAMES: 'Gestionar apodos',
                    MANAGE_ROLES: 'Gestionar roles',
                    MANAGE_WEBHOOKS: 'Gestionar webhooks',
                    MANAGE_EMOJIS: 'Gestionar emojis'
                }
            }
        });
    }
}