import { ReactionRoles } from '../../database/reaction';
import { MessageReaction, User } from 'discord.js';
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
        try {
            const miembro = await guild.members.fetch(user.id);

            const reactionRole = await ReactionRoles.findOne({
                messageID: mensaje.id,
                emojiID
            });
            if (!reactionRole) return;

            const rol = guild.roles.cache.get(reactionRole.roleID);
            if (!rol || !rol.editable) return;

            switch (reactionRole.type) {
                case 'normal':
                    miembro.roles.remove(rol.id);
                    break;
                default:
                    break;
            }
        } catch { }
    }
}