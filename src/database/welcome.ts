import { Document, Schema, Model, model } from 'mongoose';

export interface Welcome extends Document {
    guildID: string;
    channelID: string;
    embedName: string;
    message: string;
    userRoleID: string;
    botRoleID: string;
}

const welcomes: Schema<Welcome> = new Schema({
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
    },
    userRoleID: {
        type: String,
        default: ''
    },
    botRoleID: {
        type: String,
        default: ''
    }
});

export const Welcomes: Model<Welcome> = model('Welcome', welcomes);