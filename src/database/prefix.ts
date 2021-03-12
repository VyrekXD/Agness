import { Document, Schema, Model, model } from 'mongoose';

export interface Prefix extends Document {
    _id: string;
    prefix: string;
}

const prefixes: Schema<Prefix> = new Schema({
    _id: String,
    prefix: String
});

export const Prefixes: Model<Prefix> = model('Prefix', prefixes);