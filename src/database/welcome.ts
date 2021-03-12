import { Document, Schema, Model, model } from 'mongoose';

export interface Welcome extends Document {
    guildID: string;
    channelID: string;
    embed_name: string;
    message: string;
    userRoleID: string;
    botRoleID: string;
}

const welcomes: Schema<Welcome> = new Schema({
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