/* eslint-disable max-lines */
import Language from '../structures/Language';
import Agness from '../bot';

export default class Spanish extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'es',
            flag: '🇪🇸',
            nativeName: 'Español',
            strings: {
                commands: {
                    help: (prefix) => `<:world:820783752489074748> **Panel de ayuda de ${client.user?.username}**
¡Hola! En este momento cuento con **2** categorias y **${client.commands.size - client.commands.filter(c => c.category === 'Developer').size}** comandos.
**Categorias:**
> \`${prefix}help Config\` • Comandos de configuración <:config:820788840654307348>
> \`${prefix}help General\` • Comandos útiles <:general:820791014872449055>
**¿Necesitas mas ayuda?**
Si necesita información más detallada sobre cada comando, puede usar:
> \`${prefix}help <Comando>\`
**Enlaces**
**[Invitacion del Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot) | [Servidor de Soporte](https://discord.gg/K63NqEDm86) | [GitHub](https://github.com/AgnessBot/Agness) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, category, commands, quantity) => {
                        const categories = {
                            Config: '**Config** <:config:820788840654307348>',
                            General: '**General** <:general:820791014872449055>',
                            Developer: '**Developer**'
                        };
                        return `**Comandos en la categoria:** ${categories[category]}
Esta categoria tiene \`${quantity}\` comandos.
Si necesita información más detallada sobre cada comando, puedes usar:
> \`${prefix}help <Comando>\`
**Lista de comandos:**
\`\`\`
${commands}
\`\`\``;
                    },
                    helpCommand: (prefix, command) => {
                        return `__**Comando ${command.name.replace(/^[a-z]/gi, (c) => c.toUpperCase())}**__
**Descripción:** ${command.description || 'No tiene descripción.'}
**Alias:** ${command.aliases.join(' | ') || 'No tiene alias.'}
**Categoria:** ${command.category}
**Uso:** ${command.usage(prefix)}
**Ejemplo:** ${command.example(prefix)}
\`\`\`diff
¿En mantenimiento?: ${command.enabled ? 'Sí.' : 'No.'}
¿Solo servidores?: ${command.guildOnly ? 'Sí.' : 'No.'}
¿Solo NSFW?: ${command.nsfwOnly ? 'Sí.' : 'No.'}
¿Solo desarrolladores?: ${command.devsOnly ? 'Sí.' : 'No.'}

Permisos del bot:
> Servidor:
${command.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
> Canal:
${command.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}

Permisos del miembro:
> Servidor:
${command.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
> Canal:
${command.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') || 'No necesita'}
\`\`\`
`;
                    },
                    prefix: (prefix) => `Mi nuevo prefijo es: \`${prefix}\``,
                    langTitle: () => 'Lista de Lenguajes',
                    langDescription: (prefix, languages) => `Estos son los lenguajes actualmente disponibles en Agness.
**Si quieres cambiar el idioma de Agness en el servidor usa:**
> \`${prefix}lang <Código de lenguaje>\`

${languages}`,
                    guildsDescription: (members, guilds) => `En este momento, estoy en: **${guilds}** servidores y con **${members}** usuarios.`,
                    guildsFooter: (shardID) => `Este servidor está en la shard: ${shardID}`,
                    voteDescription: () => `¡Realmente aprecio que quieras votar por mí!
[¡Vota por mí aquí!](https://top.gg/bot/798573830645874718)
Recuerda que puedes votar cada 12 horas.`,
                    voteFooter: () => 'Con mucho amor ❤️',
                    avatar: (user, avatar) => `Avatar de **${user}**
> [Enlace al avatar](${avatar})`
                },
                commandErrors: {
                    cmdServer: () => 'Este comando solo está disponible para servidores.',
                    cmdCooldown: (cooldown) => `Tienes que esperar **${cooldown}s** para ejecutar este comando.`,
                    cmdEnabled: () => 'Este comando está en mantenimiento.',
                    cmdDevs: () => 'Este comando solo puede ser utilizado por los desarrolladores.',
                    cmdNSFW: () => 'Este comando solo se puede utilizar en canales NSFW.',
                    cmdMemberGuild: (perms) => `Necesita los siguientes permisos:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdMemberChannel: (perms) => `Necesita los siguientes permisos en este canal:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotGuild: (perms) => `Necesito los siguientes permisos:\n\`\`\`diff\n${perms}\n\`\`\``,
                    cmdBotChannel: (perms) => `Necesito los siguientes permisos en este canal:\n\`\`\`diff\n${perms}\n\`\`\``,
                    prefixArgs: () => 'Debes especificar el nuevo prefijo.',
                    prefixLength: () => 'El nuevo prefijo no debe superar los 5 caracteres.',
                    langNo: () => 'Debes especificar un idioma válido.',
                    helpNo: () => '> No se pudo encontrar el comando o la categoría.',
                    sayNoText: () => 'Dame un mensaje de texto que quieras que diga.',
                    sayNoPerms: () => 'Debe tener el permiso de mencionar a todos para ejecutar este comando.',
                    blackList: (reason, date) => `Estás en la lista negra. Aquí tienes más información:
> **Razón:** \`${reason}\`
> **Fecha:** \`${date}\`
Puedes apelar entrando al servidor de soporte
> [Support Server](https://discord.gg/K63NqEDm86)`
                },
                commandDescriptions: {
                    help: 'Muestra la ayuda y enlaces útiles del bot.',
                    eval: 'Evalua un código',
                    ping: 'Muestra la latencia del bot.',
                    prefix: 'Establece un prefijo personalizado en tu servidor.',
                    guilds: 'Muestra la cantidad de servidores y usuarios que tengo.',
                    say: 'Digo todo lo que tú me pidas.',
                    avatar: 'Obtiene el avatar de cualquier usuario.',
                    vote: 'Muestra el enlace de Top.gg para votar por mí.',
                    lang: 'Cambia el idioma en tu servidor para un ambiente más agradable.',
                    bl: 'Pon un usuario en la lista negra.'
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