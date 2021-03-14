import { Servers } from '../../database/server';
import Event from '../../structures/Event';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class MessageEvent extends Event {
    constructor(client: Agness) {
        super(client, {
            name: 'message'
        });
    }

    async run(message: Message): Promise<void> {
        if (!message.author || message.author.bot) return;

        const server = await Servers.findOne({ _id: message.guild?.id });
        const prefix = (server ? server.prefix : process.env.BOT_PREFIX) as string;
        const prefixes = [prefix, `<@${this.client.user?.id}>`, `<@!${this.client.user?.id}>`];
        const usedPrefix = prefixes.find((p) => message.content.startsWith(p));
        if (!usedPrefix) return;

        const args = message.content.slice(usedPrefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();
        const cmd = this.client.commands.get(command);

        try {
            if (!cmd || !cmd.canRun(message)) return;
            await cmd.run(message, args);
        } catch (e) {
            console.log(e.stack || e);
            message.channel.send(`An unexpected error has occurred, here's a small reference: ${e.message || e}`);
        }
    }
}