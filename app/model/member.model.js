const mongoose = require("mongoose");
let schema = mongoose.Schema;

let booksIssuedSchema = new schema({
    bookId: String,

});

let reservedBooksSchema = new schema({
    bookId: String,
    posted: Boolean
});

let MemberSchema = new schema({
    // type: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    // booksIssued: [booksIssuedSchema],
    booksIssued: [String],
    reservedBooks: [reservedBooksSchema],
    id:{
        type: String,
        required: true
    }
    // dateOfMemberShip: Date,
    // totalBooksCheckedOut: {
    //     type: Number,
    //     default: 0
    // },
    
    // active: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model("Member", MemberSchema, "member");