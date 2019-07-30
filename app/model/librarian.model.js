const mongoose = require("mongoose");
let schema = mongoose.Schema;

let librarianSchema = new schema({
    type: {
        type: String,
        default: "librarian"
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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

module.exports = mongoose.model("Library", librarianSchema, "library");