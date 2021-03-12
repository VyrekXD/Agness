import { Document, Schema, Model, model } from 'mongoose';

export interface Blacklist extends Document {
    userID: string;
    reason: string;
    date: Date;
}

const blacklists: Schema<Blacklist> = new Schema({
    userID: {
        type: String,
        unique: true
    },
    reason: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: () => new Date()
    }
});

export const Blacklists: Model<Blacklist> = model('Blacklists', blacklists);