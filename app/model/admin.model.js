const mongoose = require("mongoose");
let schema = mongoose.Schema;

let adminSchema = new schema({
    type: {
        type: String,
        default: "admin"
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Admin", adminSchema, "admin");