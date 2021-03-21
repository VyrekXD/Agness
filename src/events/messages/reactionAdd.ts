import { ReactionRoles } from '../../database/reaction';
import { MessageReaction, User } from 'discord.js';
import Event from '../../structures/Event';
import Agness from '../../bot';

export default class MessageReactionAddEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'messageReactionAdd'
        });
    }

    async run(messageReaction: MessageReaction, user: User): Promise<void> {
        const guild = messageReaction.message.guild;
        const message = messageReaction.message;
        const emojiID = messageReaction.emoji.id ?? messageReaction.emoji.name;

        if (!guild || user.bot) return;

        try {
            const member = await guild.members.fetch(user.id);
            const reactionRole = await ReactionRoles.findOne({
                messageID: message.id,
                emojiID
            });
            if (!reactionRole) return;

            const role = guild.roles.cache.get(reactionRole.roleID);
            if (!role || !role.editable) return;

            switch (reactionRole.type) {
                case 'only': {
                    (await ReactionRoles.find({
                        messageID: message.id,
                        type: 'only'
                    })).forEach(async (rRole) => {
                        if (reactionRole.emojiID === rRole.emojiID) {
                            member.roles.add(role.id);
                            return;
                        }
                        const reaction = message.reactions.resolve(rRole.emojiID);
                        if (!reaction) return;
                        if (reaction.partial) await reaction.fetch();
                        reaction.users.remove(user.id);
                        member.roles.remove(rRole.roleID);
                    });
                    break;
                }
                default:
                    member.roles.add(role.id);
                    break;
            }
        } catch { }
    }
}