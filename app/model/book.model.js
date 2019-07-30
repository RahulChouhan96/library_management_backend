const mongoose = require("mongoose");
let schema = mongoose.Schema;

let bookSchema = new schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    dateOfPublication: {
        type: Date,
        required: true
    },
    numberOfPages: {
        type: String,
        required: true
    },
    numberOfCopies: {
        type: Number,
        required: true
    },
    posted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Book", bookSchema, "book");