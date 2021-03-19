import { Document, Schema, Model, model } from 'mongoose';

export interface Leave extends Document {
    guildID: string;
    channelID: string;
    embedName: string;
    message: string;
}

const leaves: Schema<Leave> = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true
    },
    channelID: {
        type: String,
        default: ''
    },
    embedName: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
});

export const Leaves: Model<Leave> = model('leave', leaves);