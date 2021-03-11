import Agness from '../bot';

interface EventOptions {
    name: string;
}

export default class Event {
    client: Agness;
    name: string;

    constructor(client: Agness, options: EventOptions) {
        this.name = options.name;
        this.client = client;
    }

    // eslint-disable-next-line
    async run(...args: any[]): Promise<any> { }
}