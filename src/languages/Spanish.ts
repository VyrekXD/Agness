/* eslint-disable max-lines */
import Language from '../structures/Language';
import { Guild, MessageEmbed } from 'discord.js';
import Agness from '../bot';

export default class Spanish extends Language {
    constructor(client: Agness) {
        super(client, {
            code: 'es',
            flag: '🇪🇸',
            nativeName: 'Español',
            strings: {
                commands: {
                    help: (prefix) => `<:world:820783752489074748> **Panel de ayuda de ${client.user!.username}**
¡Hola! En este momento cuento con **6** categorias y **${client.commands.size - client.commands.filter(c => c.category === 'Developer').size}** comandos.
**Categorias:**
> \`${prefix}help Config\` • Comandos de configuración <:DiscordStaff:830458954927570974>
> \`${prefix}help General\` • Comandos útiles <a:ALsaludo:809942573065699338>
> \`${prefix}help Fun\` • Comandos divertidos <:ALwaiting:823673033625436210>
> \`${prefix}help Reaction\` • Comandos expresivos <:ALsadChamp:823671653694832681>
> \`${prefix}help Interact\` • Comandos de interacción <a:kill:832357744123576361>
> \`${prefix}help NSFW\` • Comandos NSFW +18 <:nsfw:832630274587361281>
**¿Necesitas mas ayuda?**
Si necesita información más detallada sobre cada comando, puede usar:
> \`${prefix}help <Comando>\`
**Enlaces**
**[Invitacion del Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot) | [Servidor de Soporte](https://discord.gg/K63NqEDm86) | [Top.gg](https://top.gg/bot/798573830645874718)**`,
                    helpCategory: (prefix, category, commands, quantity) => {
                        const categories = {
                            Config: '**Config** <:DiscordStaff:830458954927570974>',
                            General: '**General** <a:ALsaludo:809942573065699338>',
                            Fun: 'Diversión <a:kill:832357744123576361>',
                            Reaction: 'Reacciones <:ALsadChamp:823671653694832681>',
                            Interact: 'Interacción <a:kill:832357744123576361>',
                            NSFW: 'NSFW <:nsfw:832630274587361281>',
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
**\`Descripción:\`** ${command.description ?? 'No tiene descripción.'}
**\`Alias:\`** ${command.aliases.join(' | ') || 'No tiene alias.'}
**\`Categoria:\`** ${command.category}
**\`Cooldown:\`** ${command.cooldown} segundos.
**\`Uso:\`** ${command.usage(prefix)}
**\`Ejemplo:\`** ${command.example(prefix)}
\`\`\`diff
¿En mantenimiento?: ${command.enabled ? 'No.' : 'Sí.'}
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
                    langs: (prefix, languages) => new MessageEmbed()
                        .setTitle('Lista de Lenguajes')
                        .setDescription(`Estos son los lenguajes actualmente disponibles en Agness.
**Si quieres cambiar el idioma de Agness en el servidor usa:**
> \`${prefix}lang <Código de lenguaje>\`

${languages}`),
                    guilds: (members, guilds, shardID) => new MessageEmbed()
                        .setDescription(`En este momento, estoy en: **${guilds}** servidores y con **${members}** usuarios.`)
                        .setFooter(`Este servidor está en la shard: ${shardID}`),
                    vote: () => new MessageEmbed()
                        .setDescription(`¡Realmente aprecio que quieras votar por mí!
[¡Vota por mí aquí!](https://top.gg/bot/798573830645874718)
Recuerda que puedes votar cada 12 horas.`)
                        .setFooter('Con mucho amor ❤️'),
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
                    rrDelete: (emoji) => `Rol por reacción con emoji ${emoji} eliminado correctamente.`,
                    embedHelp: (prefix) => new MessageEmbed()
                        .setTitle('Why do I need an embed?')
                        .setDescription('Es posible que lo necesite para que su servidor se vea mucho mejor estéticamente, ya que le permitirá crear texto enriquecido, que puede poner en sus bienvenidas, despedidas y comandos personalizados. ¡La creatividad depende de ti!')
                        .addField('1. Crea y nombra a tu embed.', `__En primer lugar, no debe incluir [] o <> en el comando__
El nombre nos permitirá identificar tu incrustación para que todo luzca más ordenado a la hora de ponerlo en bienvenidas, hojas y comandos personalizados. ¿Cómo? Bueno, agregando \`{embed:[embed_name]} \` y Reemplazando \`embed_name\` con el nombre de tu embed. Para ello, puedes crearlo y darle el nombre que quieras, así:
> \`${prefix}embed create [embed_name]\``)
                        .addField('2. Editando nuestro embed.', `Bueno, es hora de editarlo como más te guste, ¡tú creatividad importa! Aquí te muestro las propiedades de un embed:
> \`author\` - [Texto | <Enlace imagen>]
> \`thumbnail\` - [Enlace de Imágen]
> \`title\` - [Texto]
> \`description\` - [Texto]
> \`footer\` - [Texto | <Enlace de imagen]>]
> \`image\` - [Enlace de imagen | Archivo adjunto]
> \`color\` - [Codigo Hex]
> \`timestamp\` - [yes/no]
La forma de uso es intuitiva con la que te será más fácil aprender cada propiedad. Bueno, sin más, el modo de edición del embed, y es el siguiente:> 
\`${prefix}embed edit [nombre] [propiedad] [valor]\``)
                        .addField('**EJEMPLO**', `Ahora, veamos un pequeño ejemplo con algunas propiedades, que le permitirá familiarizarse con el formato simple.
Comenzamos creando un incrustado al que llamaremos \`ejemplo\`.
> \`${prefix}embed create ejemplo\`
Ahora, para darle un título atractivo
> \`${prefix}embed edit ejemplo title Estoy aprendiendo a editar una embed\`
Bueno, ahora pongamos una descripción.
> \`${prefix}embed edit ejemplo description Esta descripción se ve muy linda\`
Vamos a ponerle una imagen y tendremos un simple incrustado, cuidado y poner enlaces que realmente contengan imágenes. En este caso pondremos un gif divertido.
> \`${prefix}embed edit ejemplo image https://i.imgur.com/mXOijAT.gif\`
Por último, pongamos un color que tiene que estar en código hexadecimal sin el #, si no los conoces puedes ver los colores [aquí](https://htmlcolorcodes.com/es/).
> \`${prefix}embed edit ejemplo color e658ff\`
Listo, este es un embed simple con la que, si lo desea, puede probarse:
> \`${prefix}embed preview ejemplo\``)
                        .addField('Envíalo de bienvenida/despedida', `Recuerda que en cualquier caso usarías: {embed:[embed name]}
> En este caso: \`{embed:ejemplo}\`
Para insertarlo en una bienvenida o despedida, hay tres opciones:
- Mensaje y embed:
> \`${prefix}welcome message ¡Bienvenido usuario! | {embed:ejemplo}\`
- Solo mensaje:
> \`${prefix}welcome message ¡Bienvenido usuario!\`
- O solo embed:
> \`${prefix}welcome message {embed:ejemplo}\``)
                        .addField('**VARIABLES**', `En primer lugar, ¿qué son las variables? Bueno, para lo que soy, las variables nos van a permitir hacer cosas "automatizadas" para que puedan ser reemplazadas por nombres, canales, enlaces y demás, se pueden usar tanto en incrustaciones como en texto, para bienvenidas, hojas y comandos personalizados. Aquí están algunas:
\`{user}\` - @Mención (e.j. @Aviii.#0721)
\`{server}\` - Nombre del servidor (e.j. ${client.user!.username}'s Support)
Puede encontrar la lista completa con \`${prefix}variables\``)
                        .setTimestamp()
                        .setFooter('<> Opcional | [] Requerido'),
                    embedCreated: (prefix, name) => `Embed con el nombre ${name} creado correctamente.
Usa \`${prefix}embed properties\` para ver como modificarlo.`,
                    embedDeleted: (name) => `Embed con el nombre ${name} eliminado correctamente.`,
                    embedList: (embeds, icon) => new MessageEmbed()
                        .setAuthor('Embeds del servidor', icon)
                        .setDescription(embeds || 'Este servidor no tiene ningún embed.'),
                    embedEdited: (property, name) => `La propiedad **${property}** del embed se editó correctamente.
Para agregar el embed para dar la bienvenida, salidas o tags (comandos personalizados) usa \`{embed:${name}}\`.
**__Vista previa del embed:__**`,
                    embedProperties: (prefix) => new MessageEmbed()
                        .addField('Propiedades de un embed', `> \`author\` - [Texto | <Enlace Imagen>]
> \`thumbnail\` - [Enlace de imagen]
> \`title\` - [Texto]
> \`description\` - [Texto]
> \`footer\` - [Texto | <Enlace de imagen]>]
> \`image\` - [Enlace de imagen | Attachment]
> \`color\` - [Código Hex]
> \`timestamp\` - [yes/no]

Usa: \`${prefix}embed edit [nombre] [propiedad] [valor]\` para editar tu embed.`)
                        .setFooter('<> Opcional | [] Requerido')
                        .setTimestamp(),
                    tagsHelp: (prefix) => new MessageEmbed()
                        .setDescription(`Debes especificar una opción válida.
> \`${prefix}tag create [Nombre] [Propiedades]\`
> \`${prefix}tag edit [Nombre] [Propiedades]\`
> \`${prefix}tag delete [Nombre]\`

Para ver todas los tags en el servidor, utilice:
> \`${prefix}tag list\`

Para ver las propiedades usa:
> \`${prefix}tag properties\`

Para usar un tag usa:
> \`${prefix}[Nombre del tag]\``),
                    tagsCreated: (name) => `Tag con el nombre **${name}** creado correctamente.`,
                    tagsEdited: (name) => `Tag con el nombre **${name}** creado correctamente.`,
                    tagsDeleted: (name) => `Tag con el nombre **${name}** eliminado correctamente.`,
                    tagsList: (tags, icon) => new MessageEmbed()
                        .setAuthor('Lista de tags del servidor', icon)
                        .setDescription(tags || 'Este servidor no tiene ningún tag.'),
                    tagsProperties: () => new MessageEmbed()
                        .addField('**Propiedades de un tag**', `
> \`(message:[Texto])\` - El texto normal del mensaje para enviar.
> \`(image:[URL])\` - Envía una imagen como archivo.
> \`{embed:[Nombre del embed]}\` - Envía un embed anteriormente creado (comando embed).
> \`{addRole:[ID rol]}\` - Añade un rol (coloca otro \\*:ID rol\\* para añadir más de un rol).
> \`{removeRole:[ID rol]}\` - Elimina un rol (coloca otro \\*:ID rol\\* para eliminar más de un rol).`),
                    welcomeHelp: (prefix) => new MessageEmbed()
                        .setDescription(`Debes especificar una propiedad válida.
> \`${prefix}welcome channel [#Canal | null]\`
> \`${prefix}welcome message [ <Text> | {embed:[embed name]} ]\`
> \`${prefix}welcome autorole [user|bot] [@Role | ID Rol | null]\`
Para insertar un mensaje o embed, hay tres opciones:
- Mensaje y embed:
> \`${prefix}welcome message ¡Bienvenido usuario! | {embed:ejemplo}\`
- Solo mensaje:
> \`${prefix}welcome message ¡Bienvenido usuario!\`
- O solo embed:
> \`${prefix}welcome message {embed:ejemplo}\`
Si necesita eliminar alguna propiedad, utilice:
> \`${prefix}welcome [propiedad] null\``)
                        .setFooter(`Puedes ver la configuración usando: ${prefix}welcome config`),
                    leaveHelp: (prefix) => new MessageEmbed()
                        .setDescription(`Debes especificar una propiedad válida.
> \`${prefix}leave channel [#Canal | null]\`
> \`${prefix}leave message [ <Text> | {embed[embed name]} ]\`
Para insertar un mensaje o embed, hay tres opciones:
- Mensaje y embed:
> \`${prefix}leave message Un usuario a salido del servidor. | {embed:[embed name]}\`
- Solo mensaje:
> \`${prefix}leave message Un usuario a salido del servidor.\`
- O solo embed:
> \`${prefix}leave message {embed:[embed name]}\`
Si necesita eliminar alguna propiedad, utilice:
> \`${prefix}leave [propiedad] null\``)
                        .setFooter(`Puedes ver la configuración usando: ${prefix}leave config`),
                    welcomeChannel: (channel) => `El canal de bienvenida es ahora ${channel}.`,
                    leaveChannel: (channel) => `El canal de despedidas es ahora ${channel}.`,
                    channelRemoved: () => 'El canal se eliminó correctamente.',
                    messageRemoved: () => 'El mensaje se eliminó correctamente.',
                    welcomeEmbed: (prefix, embed) => `El nuevo embed para usar en las bienvenidas ahora es **${embed}**. Para probarlo usa: \`${prefix}emit welcome\`.`,
                    leaveEmbed: (prefix, embed) => `El nuevo embed para usar en las despedidas ahora es **${embed}**. Para probarlo usa: \`${prefix}emit leave\`.`,
                    welcomeMessage: (prefix, embed) => `El mensaje ${embed ? 'y embed ' : ''}de las bienvenidas se ha actualizado correctamente. Para probarlo usa: \`${prefix}emit welcome\`.`,
                    leaveMessage: (prefix, embed) => `El mensaje ${embed ? 'y embed ' : ''}de las bienvenidas se ha actualizado correctamente. Para probarlo usa: \`${prefix}emit leave\`.`,
                    welcomeRoleRemoved: (option) => `No se dará un rol ahora cuando un ${option} se una al servidor.`,
                    welcomeRole: (role, option, prefix) => `Ahora, el rol **${role}** se dará cuando un ${option} se una al servidor. Para probarlo usa: \`${prefix}emit welcome\``,
                    welcomeConfig: (welcome, prefix) => {
                        const configEmbed = new MessageEmbed()
                            .setTitle('Configuración de bienvenida del servidor')
                            .setDescription(`**Canal:** ${welcome.channelID ? `<#${welcome.channelID}>` : 'No tiene.'}
**User AutoRole:** ${welcome.autorole.user ? `<@&${welcome.autorole.user}>` : 'No tiene.'}
**Bot AutoRole:** ${welcome.autorole.bot ? `<@&${welcome.autorole.bot}>` : 'No tiene.'}
**Embed Name:** ${welcome.embedName ? welcome.embedName : 'No tiene.'}`)
                            .addField('Mensaje:', `${welcome.message ? (welcome.message.length > 1024 ? `${welcome.message.substring(0, 1000)}. Y más..` : welcome.message) : 'No tiene.'}`);
                        if (welcome.embedName)
                            configEmbed.setFooter(`Si deseas ver el embed usa: ${prefix}embed preview ${welcome.embedName}`);
                        return configEmbed;
                    },
                    leaveConfig: (welcome, prefix) => {
                        const configEmbed = new MessageEmbed()
                            .setTitle('Configuración de bienvenida del servidor')
                            .setDescription(`**Canal:** ${welcome.channelID ? `<#${welcome.channelID}>` : 'No tiene.'}
**Embed Name:** ${welcome.embedName ? welcome.embedName : 'No tiene.'}`)
                            .addField('Mensaje:', `${welcome.message ? (welcome.message.length > 1024 ? `${welcome.message.substring(0, 1000)}. Y más..` : welcome.message) : 'No tiene.'}`);
                        if (welcome.embedName)
                            configEmbed.setFooter(`Si deseas ver el embed usa: ${prefix}embed preview ${welcome.embedName}`);
                        return configEmbed;
                    },
                    emitEvent: (event) => `Se emitió el evento **${event}** correctamente.`,
                    variables: () => new MessageEmbed()
                        .setTitle(`${client.user!.username} Variables`)
                        .setDescription('Estas variables se pueden usar al editar embeds, en mensajes de bienvenida / despedida y comandos personalizados(tags).')
                        .addField('Informacion del usuario',
                            `\`{user}\` - @Mención (e.j. @Aviii.#0721)
\`{user.name}\` - Username (e.j. Aviii.)
\`{user.discrim}\` - User tag (e.j. 0721)
\`{user.nick}\` - Apodo del miembro, si no lo tiene, mostrará "No nickname".
\`{user.createdate}\` - Fecha de creación de la cuenta
\`{user.joindate}\` - Fecha en que se unió al servidor
\`{user.id}\` - ID del usuario (e.j. 710880777662890095)
\`{user.avatar}\` - Enlace al avatar del usuario`)
                        .addField('Server Information',
                            `\`{server}\` - Nombre del servidor (e.j. ${client.user!.username}'s Support)
\`{server.prefix}\` - Prefijo del servidor (by default, a?)
\`{server.id}\` - ID del servidor (e.j. 773629394894848030)
\`{server.membercount}\` - Número total de miembros
\`{server.membercount.nobots}\` - Número total de miembros (no bots)
\`{server.membercount.bots}\` - Número total de miembros (bots)
\`{server.rolecount}\` - Número de roles
\`{server.channelcount}\` - Número de canales
\`{server.channelcount.voice}\` - Número de canales de voz
\`{server.emojiscount}\` - Numero total de emojis
\`{server.emojiscount.animate}\` - Número de emojis animados
\`{server.emojiscount.noanimate}\` - Número de emojis no animados
\`{server.createdate}\` - Fecha de creación del servidor
\`{server.boostlevel}\` - Nivel de boost del servidor
\`{server.boostcount}\` - Número de boosts  en el servidor
\`{server.icon}\` - Enlace al icono del servidor`)
                        .addField('Server Owner Information',
                            `\`{server.owner}\` - @Mención al propietario (e.j. @Aviii.#0721)
\`{server.owner.id}\` - ID del propietario (e.j. 710880777662890095)
\`{server.owner.nick}\` - Apodo del propietario, si no lo tiene, mostrará 'No nickname.'
\`{server.owner.avatar}\` - Enlace al avatar del propietario`)
                        .addField('Channel Information',
                            `\`{channel}\` - Mencion del canal (e.j. #memes)
\`{channel.id}\` - ID del canal (e.j. 773629394894848033)
\`{channel.name}\` - Nombre del canal (e.j. memes)
\`{channel.createdate}\` - Fecha de creación del canal`)
                        .setTimestamp(),
                    invite: () => new MessageEmbed()
                        .setDescription(`¡Gracias por invitarme a tu servidor! No te arrepentirás.
> [Este es mi enlace de invitación.](https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot)
En caso de que tengas alguna duda, aquí está el enlace de invitación de mi servidor de soporte.
> [Servidor de soporte](https://discord.gg/K63NqEDm86)`),
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
                        let badges = user.flags?.toArray().length ? user.flags?.toArray().map(x => flags[x]).join(' ') : 'No tiene.';
                        if (member) badges = `${guild?.ownerID === member.id ? `<:Owner:830458955545051167> ${user.flags?.toArray().map(x => flags[x]).join(' ')}` :
                            user.flags?.toArray().length ? user.flags?.toArray().map(x => flags[x]).join(' ') : 'No tiene.'}`;
                        return new MessageEmbed()
                            .setTitle(`Información de ${user.username}`)
                            .setThumbnail(user.displayAvatarURL({ size: 4096, dynamic: true }))
                            .setDescription(`**ID:** ${user.id}
**Etiqueta:** ${user.tag}
**Mención:** ${user.toString()} ${user.bot ? '| <:bot:830462923590598736>' : ''}
**Insignias:** ${badges}
**Último mensaje:** ${user.lastMessage ? `[Click Aquí](${user.lastMessage?.url})` : 'No lo encontre.'}
**Se unió a Discord:** ${user.createdAt.toLocaleString('en-US', { timeZoneName: 'short', timeZone: 'America/Lima' })}
${member ? `**Se unió al servidor:** ${member.joinedAt?.toLocaleString('en-US', { timeZoneName: 'short', timeZone: 'America/Lima' })}` : ''}`)
                            .setFooter(`(◍•ᴗ•◍)❤️ Pedido por: ${author.tag}`, author.displayAvatarURL({ format: 'webp', size: 4096, dynamic: true }));
                    },
                    kill: (author, mention) => {
                        const frases = [
                            `**${author} ha matado a ${mention}.`,
                            `**${mention} ha sido asesinado por ${author}**`,
                            `**${mention} a muerto a manos de ${author}** D:`,
                            `**${author} hizo picadillos a ${mention}.**`,
                            `**${mention} se ha ido al cielo gracias a ${author}.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    smug: (author) => {
                        const frases = [
                            `**${author} presume de si mism@.**`,
                            `**${author} siempre sera lo mejor.**`,
                            `**Todos miren como presume ${author}.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    disgust: (author) => {
                        const frases = [
                            `**A ${author} no le gusta para nada 🤮**`,
                            `**${author} preferiria que lo maten :(**`,
                            `**No, para ${author} no es agradable.**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    laugh: (author) => {
                        const frases = [
                            `**Miren como ${author} ríe a carcajadas.**`,
                            `**${author} esta muriendo de risa 😆**`,
                            `**Miren la risa de ${author} :D**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    baka: (author, mention) => {
                        const frases = [
                            `**${author} le dice baka a ${mention}**`,
                            `**${mention} baka baka baka** *dicho por ${author}*`,
                            `**${author} dice que ${mention} es baka D:**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    slap: (author, mention) => {
                        const frases = [
                            `**${author} abofetea a ${mention}** D:`,
                            `**${mention} recibe una fuerte bofetada de ${author}**`,
                            `**${author} no deja de abofetear a ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    hug: (author, mention) => {
                        const frases = [
                            `**${author} abraza a ${mention}** D:`,
                            `**${mention} recibe un caluroso abrazo de ${author}**`,
                            `**${author} no suelta a ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    cuddle: (author, mention) => {
                        const frases = [
                            `**${author} acaricia a ${mention}** :3`,
                            `**${author} le da caricias a ${mention}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    pat: (author, mention) => {
                        const frases = [
                            `**${author} da palmaditas a ${mention}** :3`,
                            `**${mention} recibe palmaditas de ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    kiss: (author, mention) => {
                        const frases = [
                            `**${author} le dio un beso a ${mention}** -w-`,
                            `**${mention} recibio un beso de ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    feed: (author, mention) => {
                        const frases = [
                            `**${author} ha dado de comer a ${mention}** .w.`,
                            `**${mention} ha comido gracias a ${author}**`
                        ];
                        const random = frases[Math.floor(Math.random() * frases.length)];
                        return random;
                    },
                    dog: () => '¡Mira un perrito! :3 ❤️',
                    cat: () => '¿Querías un lindo gatito? 🥰',
                    bunny: () => 'Este es un conejo hermoso 😋',
                    duck: () => '¿Alguien dijo pato? 🦆',
                    nsfw: () => 'Espero lo disfrutes 🕵️‍♂️',
                    nsfwRequest: (author) => `Pedido por: ${author.tag}`,
                    purgeNothing: () => 'No encontre nada para borrar en los ultimos 100 mensajes.',
                    purge: (messages) => `<:right:830079699803701259> He borrado **${messages}** correctamente.`,
                    Waiting: () => 'Esto puede tardar un poco...',
                    kickCheck: () => 'ha sido kickeado.',
                    banCheck: () => 'ha sido baneado.',
                    unbanOK: (user) => `**${user}** ha sido quitado de la lista de baneos.`
                },
                commandErrors: {
                    noImage: () => 'Debes especificar la URL de una imagen válida.',
                    noChannel: () => 'No pude encontrar el canal o no es válido.',
                    noChannelView: () => 'No tengo permisos para ver ese canal.',
                    noChannelWrite: () => 'No puedo enviar mensajes en ese canal.',
                    noRole: () => 'No pude encontrar ese rol o no es válido.',
                    noRoleAdd: () => 'No tengo suficientes permisos para otorgar ese rol.',
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
                    rrMax: () => 'Solo puede tener 32 roles por reacción por servidor.',
                    rrNoType: (prefix) => `Ese no es un tipo de rol por reacción. Usa [${prefix}reactrole help] para ver más sobre los roles por reacción.`,
                    rrNoChannelReactions: () => 'No tengo permisos para agregar reacciones en ese canal.',
                    rrNoMessage: () => 'Debes especificar la ID de un mensaje.',
                    rrNoMessageFound: () => 'No se encontró el mensaje.',
                    rrErrorMessage: () => 'Se produjo un error al encontrar el mensaje, inténtelo de nuevo.',
                    rrNoEmoji: () => 'No pude encontrar ese emoji en mi caché, intente agregar el emoji en el servidor.',
                    rrExists: () => 'Ya hay un rol por reacción con ese emoji.',
                    rrTime: () => 'Se acabó el tiempo ;(, inténtalo de nuevo.',
                    rrDeleteNoEmoji: () => 'Debes especificar el emoji.',
                    rrDeleteNoMessage: () => 'Debes especificar la ID del mensaje.',
                    rrDeleteEmoji: () => 'Debes especificar un emoji válido.',
                    rrDeleteNo: () => 'El rol por reacción no se pudo eliminar, verifica si hay uno con esa ID de mensaje y emoji en el servidor.',
                    embedMax: () => 'Solo puede tener 10 embeds por servidor.',
                    embedName: () => 'Debe especificar el nombre del embed y debe tener un máximo de 10 caracteres.',
                    embedExists: () => 'Ya hay un embed con ese nombre. Prueba con otro.',
                    embedNoExists: () => 'No hay un embed con ese nombre o no especificaste ninguno.',
                    embedNoValue: (property) => `Debes poner el texto para poner como ${property}.`,
                    embedMaxCharacters: (property, max) => `El **${property}** debe tener ${max} carácteres o menos.`,
                    embedNoTimestamp: () => 'Debes especificar si deseas mostrar el tiempo (yes/no).',
                    embedNoColor: () => 'Debes especificar el color sin #.',
                    embedNoProperty: (prefix) => `La propiedad que especificaste no es válida.
Puedes ver la lista de propiedades con \`${prefix}embed properties\`.`,
                    tagsMax: () => 'Solo puede tener 10 tags por servidor.',
                    tagsName: () => 'Debe especificar el nombre del tag y debe tener un máximo de 10 caracteres.',
                    tagsExists: () => 'Ya hay un tag con ese nombre. Prueba con otro.',
                    tagsNoMessage: () => 'Debes especificar un mensaje, embed o imagen para enviar o los tres.',
                    tagsNoRolePerms: () => 'No tengo suficientes permisos para agregar o remover roles.',
                    tagsNoRole: () => 'No puedo añadir o eliminar los roles que has especificado o estos no existen.',
                    tagsNoExists: () => 'No hay tag con ese nombre o no especificaste uno.',
                    tagsNoCommand: () => 'No puedes crear un tag con el nombre de un comando.',
                    welcomeNoMessage: () => 'Debe especificar un mensaje de bienvenida.',
                    leaveNoMessage: () => 'Debe especificar un mensaje de despedida.',
                    welcomeRoleType: () => 'Debes especificar el tipo de usuario que recibirá el rol (user/bot)',
                    emitNoEvent: () => 'Debes especificar el evento a probar.',
                    killNoMention: () => '¿A quién quieres matar? *se aleja* (~_~;)',
                    killMentionMe: () => 'No- A mí no porfavor ;w;',
                    killMentionAuthor: () => 'No puedes matarte a ti mismo >:c',
                    bakaNoMention: () => 'Menciona a quién quieres decir baka owo',
                    bakaMentionMe: () => 'Yo no soy baka, tú lo eres D:',
                    bakaMentionAuthor: () => '¿Tú eres baka? okey- ;-;',
                    slapNoMention: () => 'Menciona a quién quieres abofetear ^w^',
                    slapMentionMe: () => 'No- A mí no me abofetees D:',
                    slapMentionAuthor: () => 'Estoy segura que no quieres hacer eso e.e',
                    hugNoMention: () => '¿A quién quieres abrazar? :3',
                    hugMentionAuthor: () => 'No puedes abrazarte a ti mismo, lo siento-',
                    cuddleNoMention: () => 'Menciona a quien quieres acariciar u.u',
                    cuddleMentionAuthor: () => 'Hmm.. No puedes hacer eso :(',
                    patNoMention: () => 'Menciona a la persona que recibirá tus palmatidas c:',
                    patMentionAuthor: () => 'No puedes acariciarte a ti mismo D:',
                    kissNoMention: () => 'Menciona a quien quieres besar 7w7',
                    kissMentionAuthor: () => 'Hmm.. no te puedes besar a ti mismo ._.',
                    feedNoMention: () => 'Menciona a quien quieres dar de comer .w.',
                    feedMentionAuthor: () => 'Hmm.. Menciona a alguien que no seas tú e.e',
                    cooldownReactionAdd: (coldoown) => `Tienes que esperar **${coldoown}s** para obtener el siguiente rol.`,
                    cooldownReactionRemove: (coldoown) => `Tienes que esperar **${coldoown}s** para eliminarte el siguiente rol.`,
                    purgeNoArgs: (prefix) => new MessageEmbed()
                        .setTitle('Modos de uso.')
                        .setDescription(`${prefix}purge <cantidad>
${prefix}purge bots [ cantidad ]
${prefix}purge users [ cantidad ] [ @menciones | IDs ]
${prefix}purge embeds [ cantidad ]
${prefix}purge attachments [ cantidad ]`),
                    purgeNoNumber: () => 'Debes especificar un número o tipo válido.',
                    purgeNoValid: () => 'Debes de especificar un numero del 1 al 100.',
                    purgeNoUsers: () => 'Menciona a los usuarios o especifica sus IDs',
                    kickNoArgs: () => 'Debes especificar a qué miembros quieres kickear.',
                    kickNoUsers: () => 'Usuario(s) no válido(s). Por favor asegurese de mencionar a alguien y que este pueda ser kickeado por ambos.',
                    kickError: () => 'no fue kickeado.',
                    kickUsersMax: () => 'Solo puedes kickear 20 usuarios a la vez.',
                    banNoArgs: () => 'Debes especificar a qué miembros quieres banear.',
                    banNoUsers: () => 'Usuario(s) no válido(s). Por favor asegurese de mencionar a alguien y que este pueda ser baneado por ambos.',
                    banError: () => 'no fue baneado.',
                    banUsersMax: () => 'Solo puedes banear 20 usuarios a la vez.',
                    unbanNoUser: () => 'Debes especificar el usuario al que quieres revocar el baneo.',
                    unbanUserNoBan: () => 'Este usuario no se encuentra en la lista de baneos.',
                    unBanNo: (user) => `No pude remover a **${user}** de la lista de baneos`
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
                    reactrole: 'Establece roles con determinado emoji en el mensaje que quieras, funciona para roles de colores, roles para menciones. ¡Todo es posible!',
                    embed: 'Crea embeds personalizados para tus tags, bienvenidas y salidas. ¡Tú haces el diseño!',
                    tags: 'Crea comandos personalizados que pueden enviar mensajes, fotos y añadir o eliminar roles. ¡Todo es posible!',
                    welcome: 'Configura el canal, los mensajes, y roles que más prefieras cuando alguien se une a tu servidor c:',
                    leave: 'Establezca el canal y los mensajes que prefiera cuando alguien abandone su servidor >:c',
                    emit: 'Haz una simulación de eventos en el bot.',
                    variables: 'Mira los distintos tipos de variables que puedes usar con el bot.'

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
                    MANAGE_EMOJIS: 'Gestionar emojis',
                    REQUEST_TO_SPEAK: 'Reques to speak'
                }
            }
        });
    }
}