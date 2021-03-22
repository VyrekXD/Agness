import { Document, Schema, Model, model } from 'mongoose';

export interface Tag extends Document {
    guildID: string;
    name: string;
    message: string;
    embedName: string;
    addRoleID: string[];
    removeRoleID: string[];
    image: string;
}

const tag: Schema<Tag> = new Schema({
    guildID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    embedName: {
        type: String,
        default: ''
    },
    addRoleID: {
        type: [String],
        default: []
    },
    removeRoleID: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: ''
    }
});

export const Tags: Model<Tag> = model('tags', tag);