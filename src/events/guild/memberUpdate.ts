import Event from '../../structures/Event';
import Agness from '../../bot';
import { GuildMember } from 'discord.js';

export default class MemberUpdateEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildMemberUpdate'
        });
    }

    async run(oldM: GuildMember, newM: GuildMember): Promise<void> {
        if (newM.guild.id !== '798551506202394654') return;
        if (
            !oldM.roles.cache.has('819270744034246696') &&
            newM.roles.cache.has('819270744034246696')
        ) newM.roles.add('819270811759542353')
    }
}