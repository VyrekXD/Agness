/* eslint-disable no-unused-vars */
import Agness from '../bot';

interface EventOptions {
    name: string;
}

export default class Event {
    name: string;

    constructor(public client: Agness, options: EventOptions) {
        this.name = options.name;
    }

    // eslint-disable-next-line
    async run(...args: any[]): Promise<any> { }
}