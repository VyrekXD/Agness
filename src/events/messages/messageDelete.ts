import { ReactionRoles } from '../../database/reaction';
import Event from '../../structures/Event';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class MessageDeleteEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'messageDelete'
        });
    }

    async run(message: Message): Promise<void> {
        await ReactionRoles.deleteMany({
            guildID: message.guild?.id,
            messageID: message.id
        });
    }
}