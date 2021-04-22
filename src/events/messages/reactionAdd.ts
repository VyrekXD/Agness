import { MessageReaction, User } from 'discord.js';
import { ReactionRoles } from '../../database/reaction';
import Event from '../../structures/Event';
import Agness from '../../bot';
import { Servers } from '../../database/server';
import Language from '../../structures/Language';

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
        let server = await Servers.findOne({ guildID: guild?.id });
        if (!server) server = await Servers.create({ guildID: guild.id });
        this.lang = this.client.languages.get(server.language) as Language;
        try {
            const member = await guild.members.fetch(user.id);
            const reactionRole = await ReactionRoles.findOne({
                messageID: message.id,
                emojiID
            });
            if (!reactionRole) return;
            if (this.checkCooldowns(`${user.id}-${guild.id}`)) {
                await user.send(this.lang.getError('cooldownReactionAdd', Number(((this.cooldowns.get(`${user.id}-${guild.id}`)!.date as number) - Date.now()) / 1000).toFixed(2))).catch(() => void 0);
                messageReaction.users.remove(user).catch(() => void 0);
                return;
            }
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
        } catch (e) {
            console.log(e);
        }
    }
}