const mongoose = require("mongoose");
const shortId = require("shortid");

let schema = mongoose.Schema;

let issuedBookSchema = new schema({
    memberId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    librarianId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // id: {
    //     type: String,
    //     default: shortId.generate
    // }
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema, "issuedBook");