const mongoose = require("mongoose");
let schema = mongoose.Schema;

let memberSchema = new schema({
    type: {
        type: String,
        default: "member"
    },
    name: {
        type: String,
        required: true
    },
    dateOfMemberShip: Date,
    totalBooksCheckedOut: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Member", memberSchema, "member");