import Event from '../../structures/Event';
import Agness from '../../bot';
import { GuildMember } from 'discord.js';

export default class MemberUpdateEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'guildMemberUpdate'
        });
    }

    async run(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
        if (newMember.guild.id === '798551506202394654') return;
        if (!oldMember.roles.cache.has('819270744034246696') && newMember.roles.cache.has('819270744034246696')) newMember.roles.add('819270811759542353');
    }
}