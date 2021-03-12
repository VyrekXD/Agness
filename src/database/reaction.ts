import { Document, Schema, Model, model } from 'mongoose';

export interface Reaction extends Document {
    guildID: string;
    messageID: string;
    roleID: string;
    reaction: string;
    type: string;
}

const reactions: Schema<Reaction> = new Schema({
    guildID: String,
    messageID: String,
    roleID: String,
    reaction: String,
    type: String
});

export const Reactions: Model<Reaction> = model('Roles', reactions);