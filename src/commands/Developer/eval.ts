import Command from '../../structures/Command';
import { promisify, inspect } from 'util';
import { exec } from 'child_process';
import { Message } from 'discord.js';
import Agness from '../../bot';

export default class EvalCommand extends Command {
    constructor(client: Agness, category: string) {
        super(client, {
            name: 'eval',
            aliases: ['e'],
            category
        });
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        if (!args[0]) return message.channel.send('What do you wanna evaluate?');
        switch (args[0].toLowerCase()) {
            case '-a': {
                if (!args[1]) return message.channel.send('What do you wanna evaluate?');
                try {
                    let evalued = await eval('(async() => {\n' + args.slice(1).join(' ') + '\n})();');
                    if (typeof (evalued) !== 'string') {
                        evalued = inspect(evalued, { depth: 0 });
                    }
                    message.channel.send(evalued.slice(0, 1950), { code: 'js' });
                } catch (err) {
                    message.channel.send(err.toString().slice(0, 1950), { code: 'js' });
                }
                break;
            }
            case '-sh': {
                if (!args[1]) return message.channel.send('What should I run in the terminal?');
                const evalued = args.slice(1).join(' ');
                try {
                    const { stdout, stderr } = await promisify(exec)(evalued);
                    if (!stdout && !stderr) return message.channel.send('I ran that but there\'s no nothing to show.');
                    if (stdout)
                        message.channel.send(stdout.slice(0, 1950), { code: 'sh' });
                    if (stderr)
                        message.channel.send(stderr.slice(0, 1950), { code: 'sh' });
                } catch (err) {
                    message.channel.send(err.toString().slice(0, 1950), { code: 'sh' });
                }
                break;
            }
            default: {
                try {
                    let evalued = eval(args.join(' '));
                    if (typeof (evalued) !== 'string')
                        evalued = inspect(evalued, { depth: 0 });
                    message.channel.send(evalued.slice(0, 1950), { code: 'js' });
                } catch (err) {
                    message.channel.send(err.toString().slice(0, 1950), { code: 'js' });
                }
                break;
            }
        }
    }
}