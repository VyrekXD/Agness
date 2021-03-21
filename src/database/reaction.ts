import { Document, Schema, Model, model } from 'mongoose';

export interface ReactionRole extends Document {
    guildID: string;
    messageID: string;
    channelID: string;
    roleID: string;
    emojiID: string;
    type: 'normal' | 'unique' | 'only';
}

const reactionRoles: Schema<ReactionRole> = new Schema({
    guildID: {
        type: String,
        required: true
    },
    messageID: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    },
    roleID: {
        type: String,
        required: true
    },
    emojiID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['normal', 'unique', 'only']
    }
});

export const ReactionRoles: Model<ReactionRole> = model('roles', reactionRoles);