/* eslint-disable max-lines */
import Language from '../structures/Language';
import { MessageEmbed } from 'discord.js';
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
**Descripción:** ${command.description ?? 'No tiene descripción.'}
**Alias:** ${command.aliases.join(' | ') ?? 'No tiene alias.'}
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
${command.botGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'No necesita'}
> Canal:
${command.botChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'No necesita'}

Permisos del miembro:
> Servidor:
${command.memberGuildPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'No necesita'}
> Canal:
${command.memberChannelPermissions.map((p) => `+ ${this.parsePermission(p)}`).join('\n') ?? 'No necesita'}
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
> [Enlace al avatar](${avatar})`,
                    rrHelp: (prefix) => new MessageEmbed()
                        .addField('Tipos de roles por reacción', `Por el momento, hay 3 tipos de roles por reacción. Para obtener información específica sobre uno, usa:
> \`${prefix}reactrole help normal\`
> \`${prefix}reactrole help unique\`
> \`${prefix}reactrole help only\``)
                        .addField('¿Cómo obtengo la ID de un mensaje?', `Debes activar el __Modo desarrollador__ en la configuración, hacer clic derecho en un mensaje y copiar ID.
Información detallada en el GIF de abajo.`),
                    rrReact: (role) => `Estoy preparando el rol por reacción para ${role}.
Tienes 30 segundos para reaccionar con el emoji con el que quieres que se le de el rol.`,
                    rr: (role, emoji) => `El rol **${role}** se añadirá la próxima vez que alguien reaccione con el emoji ${emoji} en ese mensaje.`,
                    rrNormal: () => new MessageEmbed()
                        .setTitle('Reacción de tipo normal')
                        .setDescription(`El rol por reacción de tipo **normal** te permite agregar y quitar el rol especificado cuando reaccionas o cuando eliminas la reacción.
Aquí hay ejemplo de cómo funciona y cómo se configura:`),
                    rrUnique: () => new MessageEmbed()
                        .setTitle('Reacción de tipo única (unique)')
                        .setDescription(`El rol por reacción de tipo **unique** te permite agregar el rol especificado una vez y no se eliminará.
Aquí hay ejemplo de cómo funciona y cómo se configura:`),
                    rrOnly: () => new MessageEmbed()
                        .setTitle('Reacción de tipo sola (only)')
                        .setDescription(`El rol por reacción de tipo **only** te permite tener solo un rol de los otros del mismo tipo en el mensaje.
Aquí hay ejemplo de cómo funciona y cómo se configura:`),
                    rrDelete: (emoji) => `Rol por reacción con emoji ${emoji} eliminado correctamente.`
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
                    sayNoText: () => 'Debes especificar el texto que quieras que diga.',
                    sayNoPerms: () => 'Debes tener el permiso de mencionar a todos para ejecutar este comando.',
                    blacklist: (reason, date) => `Estás en la lista negra. Aquí tienes más información:
> **Razón:** \`${reason}\`
> **Fecha:** \`${date}\`
Puedes apelar entrando al servidor de soporte
> [Servidor de Soporte](https://discord.gg/K63NqEDm86)`,
                    rrNoOption: (prefix) => `Debes especificar una opción o rol válido.
> \`${prefix}reactrole [@Rol] [Tipo] [ID Mensaje] <#Canal>\`
> \`${prefix}reactrole delete [Emoji] [ID Mensaje]\`
Si necesitas un poco más de ayuda, puede usar: \`${prefix}reactrole help\``,
                    rrNoRole: () => 'No pude encontrar ese rol o no es válido.',
                    rrNoRoleAdd: () => 'No tengo suficientes permisos para otorgar ese rol.',
                    rrNoType: (prefix) => `Ese no es un tipo de rol por reacción. Usa [${prefix}reactrole help] para ver más sobre los roles por reacción.`,
                    rrNoChannel: () => 'No pude encontrar el canal o no es válido.',
                    rrNoChannelView: () => 'No tengo permisos para ver ese canal.',
                    rrNoChannelReactions: () => 'No tengo permisos para agregar reacciones en ese canal.',
                    rrNoMessage: () => 'Debes especificar la ID de un mensaje.',
                    rrNoMessageFound: () => 'No se encontró el mensaje.',
                    rrErrorMessage: () => 'Se produjo un error al encontrar el mensaje, inténtelo de nuevo.',
                    rrNoEmoji: () => 'No pude encontrar ese emoji en mi caché, intente agregar el emoji en el servidor.',
                    rrExists: () => 'Ya hay un rol por reacción con ese emoji.',
                    rrTime: () => 'Se acabó el tiempo ;(, inténtelo de nuevo.',
                    rrDeleteNoEmoji: () => 'Debes especificar el emoji.',
                    rrDeleteNoMessage: () => 'Debes especificar la ID del mensaje.',
                    rrDeleteEmoji: () => 'Debes especificar un emoji válido.',
                    rrDeleteNo: () => 'El rol por reacción no se pudo eliminar, verifica si hay uno con esa ID de mensaje y emoji en el servidor.'
                },
                commandDescriptions: {
                    help: 'Muestra la ayuda y enlaces útiles del bot.',
                    eval: 'Evalua un código',
                    ping: 'Muestra la latencia del bot.',
                    prefix: 'Establece un prefijo personalizado en tu servidor.',
                    guilds: 'Muestra la cantidad de servidores y usuarios que tengo.',
                    say: 'Digo todo lo que quieras.',
                    avatar: 'Obtiene el avatar de cualquier usuario.',
                    vote: 'Muestra el enlace de Top.gg para votar por mí.',
                    lang: 'Cambia el idioma en tu servidor para un ambiente más agradable.',
                    bl: 'Añade a un usuario a la lista negra.',
                    reactrole: 'Establece roles con determinado emoji en el mensaje que quieras, funciona para roles de colores, roles para menciones. ¡Todo es posible!'
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