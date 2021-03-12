import { Document, Schema, Model, model } from 'mongoose';

export interface Embed extends Document {
    guildID: string;
    embed_name: string;
    author_text?: string;
    author_image?: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    image?: string;
    footer_text?: string;
    footer_image?: string;
    timestamp?: boolean;
    color?: string;
}

const embeds: Schema<Embed> = new Schema({
    guildID: String,
    embed_name: String,
    author_text: {
        type: String,
        default: ''
    },
    author_image: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    footer_text: {
        type: String,
        default: ''
    },
    footer_image: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '66e7ae'
    }
});

export const Embeds: Model<Embed> = model('Embed', embeds);