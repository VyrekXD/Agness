import { ReactionRoles } from '../../database/reaction';
import { MessageReaction, User } from 'discord.js';
import Language from '../../structures/Language';
import { Servers } from '../../database/server';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class MessageReactionRemoveEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'messageReactionRemove'
        });
    }

    async run(messageReaction: MessageReaction, user: User): Promise<void> {
        const guild = messageReaction.message.guild;
        const mensaje = messageReaction.message;
        const emojiID = messageReaction.emoji.id ?? messageReaction.emoji.name;

        if (!guild || user.bot) return;
        let server = await Servers.findOne({ guildID: guild?.id });
        if (!server) server = await Servers.create({ guildID: guild.id });
        this.lang = this.client.languages.get(server.language) as Language;
        try {
            const member = await guild.members.fetch(user.id);
            const reactionRole = await ReactionRoles.findOne({
                messageID: mensaje.id,
                emojiID
            });
            if (!reactionRole) return;
            if (this.checkCooldowns(`${user.id}-${guild.id}`)) {
                await user.send(this.lang.getError('cooldownReactionRemove', Number(((this.cooldowns.get(`${user.id}-${guild.id}`)!.date as number) - Date.now()) / 1000).toFixed(2))).catch(() => void 0);
                return;
            }
            const role = guild.roles.cache.get(reactionRole.roleID);
            if (!role || !role.editable) return;

            switch (reactionRole.type) {
                case 'normal':
                    member.roles.remove(role.id);
                    break;
                default:
                    break;
            }
        } catch { }
    }
}