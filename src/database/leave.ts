import { Document, Schema, Model, model } from 'mongoose';

export interface Leave extends Document {
    guildID: string;
    channelID: string;
    embed_name: string;
    message: string;
}

const leaves: Schema<Leave> = new Schema({
    guildID: {
        type: String,
        unique: true
    },
    channelID: {
        type: String,
        default: ''
    },
    embed_name: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
});

export const Leaves: Model<Leave> = model('leave', leaves);