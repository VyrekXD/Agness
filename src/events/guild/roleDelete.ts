import { ReactionRoles } from '../../database/reaction';
import Event from '../../structures/Event';
import { Role } from 'discord.js';
import Agness from '../../bot';

export default class RoleDeleteEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'roleDelete'
        });
    }

    async run(role: Role): Promise<void> {
        await ReactionRoles.deleteMany({
            guildID: role.guild.id,
            roleID: role.id
        });
    }
}