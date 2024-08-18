import mongoose, { Model, Schema } from "mongoose";

const CardSchema: Schema = new Schema({
    title : {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps:true})

export const Cards = mongoose.model('Cards',CardSchema);