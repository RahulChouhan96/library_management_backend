const mongoose = require("mongoose");
let schema = mongoose.Schema;

let reservedNotificationSchema = new schema({
    memberId: String,
    bookId: String
});

let reservedBooksSchema = new schema({
    bookId: String,
    memberId: String,
    posted: Boolean
});

let issuedBookInfoSchema = new schema({
    bookId: String,
    memberId: String,
    issuingDate: Date,
    dueDate: Date,
    fine: Number
});

let librarianSchema = new schema({
    type: {
        type: String,
        default: "librarian"
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    issuedBooksInfo: [issuedBookInfoSchema],
    reservedNotification: [reservedNotificationSchema],
    reservedBooks: [reservedBooksSchema]
    // address: {
    //     type: String,
    //     required: true
    // },
    
    // active: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model("Librarian", librarianSchema, "librarian");