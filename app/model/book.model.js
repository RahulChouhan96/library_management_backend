const mongoose = require("mongoose");
const shortId = require("shortid");

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
    category: {
        tpye: String,
        // required: true,
        enum: ["Science", "Adventure", "Mathematics"]
    },
    id: {
        type: String,
        default: shortId.generate
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
    totalNumberOfCopies: {
        type: Number,
        required: true
    },
    copiesIssuedBy: [String],
    librarianId: {
        type: String,
        required: true
    }
    // posted: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model("Book", bookSchema, "book");