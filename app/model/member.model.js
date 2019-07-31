const mongoose = require("mongoose");
let schema = mongoose.Schema;

let booksIssuedSchema = new schema({
    bookId: String,

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
        tpye: Date,
        required: true
    },
    // booksIssued: [booksIssuedSchema],
    booksIssued: [String],
    reservedBooks: [String],
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

module.exports = mongoose.model("User", MemberSchema, "user");