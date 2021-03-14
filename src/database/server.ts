import { Document, Schema, Model, model } from 'mongoose';

export interface Server extends Document {
    guildID: string;
    prefix: string;
    language: string;
}

const servers: Schema<Server> = new Schema({
    guildID: {
        type: String,
        unique: true
    },
    prefix: {
        type: String,
        default: process.env.BOT_PREFIX
    },
    language: {
        type: String,
        default: 'en'
    }
});

export const Servers: Model<Server> = model('server', servers);