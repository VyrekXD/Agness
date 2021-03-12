import { Document, Schema, Model, model } from 'mongoose';

export interface Tag extends Document {
    guildID: string;
    name: string;
    message: string;
    embed_name: string;
    addRoleID: string[];
    deleteRoleID: string[];
    image: string;
}

const tag: Schema<Tag> = new Schema({
    guildID: String,
    name: String,
    message: {
        type: String,
        default: ''
    },
    embed_name: {
        type: String,
        default: ''
    },
    addRoleID: [String],
    deleteRoleID: [String],
    image: {
        type: String,
        default: ''
    }
});

export const Tags: Model<Tag> = model('Tags', tag);