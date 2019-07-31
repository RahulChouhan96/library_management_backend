const mongoose = require("mongoose");
let schema = mongoose.Schema;

let reservedNotificationSchema = new Schema({
    memberId: String,
    bookId: String
});

let issuedBookInfoSchema = new Schema({
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
    reservedNotification: [reservedNotificationSchema]
    // address: {
    //     type: String,
    //     required: true
    // },
    
    // active: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model("Library", librarianSchema, "library");