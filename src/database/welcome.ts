import { Document, Schema, Model, model } from 'mongoose';

export interface Welcome extends Document {
    guildID: string;
    channelID: string;
    embedName: string;
    message: string;
    autorole: {
        user: string;
        bot: string;
    };
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
    autorole: {
        user: {
            type: String,
            default: ''
        },
        bot: {
            type: String,
            default: ''
        }
    }
});

export const Welcomes: Model<Welcome> = model('welcome', welcomes);