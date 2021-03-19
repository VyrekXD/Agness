import { Document, Schema, Model, model } from 'mongoose';

export interface Reaction extends Document {
    guildID: string;
    messageID: string;
    roleID: string;
    reaction: string;
    type: string;
}

const reactions: Schema<Reaction> = new Schema({
    guildID: {
        type: String,
        required: true
    },
    messageID: {
        type: String,
        required: true
    },
    roleID: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

export const Reactions: Model<Reaction> = model('Roles', reactions);