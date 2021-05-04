import Command from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import Agness from '../../bot';

export default class DJSCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'djs',
            botChannelPermissions: ['EMBED_LINKS'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message> {
        if (!args[0]) return message.channel.send('What do you want to look for in the documentation?');
        let src = '';
        let cont = '';
        if (['stable', 'master', 'commando', 'rpc', 'akairo', 'akairo-master', 'collection'].includes(args[0]?.toLowerCase())) {
          src = args[0];
          cont = args.slice(1).join(' ');
        } else {
          src = 'stable';
          cont = args.join(' ');
        }
        const page = `https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(src)}&q=${encodeURIComponent(cont)}`;
        const r = await fetch(page);
        if (!r.ok) return message.channel.send(`Error: Status code from ${page} returned ${r.status} (${r.statusText})`);
        const res = await r.json();
        if (!res) return message.channel.send('I found no results.');
        if (res.error) return message.channel.send(new MessageEmbed().setTitle('Error ' + res.status).setDescription(res.error + ': ' + res.message));
        return message.channel.send(new MessageEmbed(res));
    }
}