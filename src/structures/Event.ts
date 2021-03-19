/* eslint-disable no-unused-vars */
import { ClientEvents } from 'discord.js';
import Agness from '../bot';

interface EventOptions {
    name: keyof ClientEvents;
}

export default abstract class Event {
    name: keyof ClientEvents;

    constructor(public client: Agness, options: EventOptions) {
        this.name = options.name;
    }

    // eslint-disable-next-line
    abstract run(...args: any[]): Promise<any>;
}