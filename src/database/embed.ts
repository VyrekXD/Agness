import { Document, Schema, Model, model } from 'mongoose';

export interface Embed extends Document {
    guildID: string;
    name: string;
    author: {
        text: string;
        image: string;
    };
    title: string;
    description: string;
    thumbnail: string;
    image: string;
    footer: {
        text: string;
        image: string;
    };
    timestamp: boolean;
    color: string;
}

const embeds: Schema<Embed> = new Schema({
    guildID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        text: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        }
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
    footer: {
        text: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        }
    },
    timestamp: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'b7d8d6'
    }
});

export const Embeds: Model<Embed> = model('embed', embeds);