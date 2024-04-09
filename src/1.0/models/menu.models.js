const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuModel = new Schema({
    name: {
        required: [true, "name is a required field"],
        type: String,
    },
    description: {
        required: [true, "description is a required field"],
        type: String,
    },
    image: {
        type: String,
    },
    crudites: {
        required: [true, "crudites is a required field"],
        type: [String],
    },
    sauces: {
        required: [true, "sauces is a required field"],
        type: [String],
    },
    boissons: {
        required: [true, "boissons is a required field"],
        type: [String],
    },
    prix: {
        required: [true, "prix is a required field"],
        type: Number,
    }
});

module.exports = mongoose.model("Menu", menuModel);
