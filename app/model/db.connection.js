const mongoose = require("mongoose");

let INDEX = require("./index");

require("./member.model");
require("./admin.model");
require("./book.model");
require("./librarian.model");

let options = {
    user: INDEX.DBURL,
    pass: INDEX.DBPWD,
    authSource: INDEX.authSource,
    useNewUrlParser: true
};

let _conn = mongoose.connection;

_conn.on("error", (error)=>{
    console.log("Connection with MongoDB Failed");
    console.log(error);
});

_conn.once("open", () => {
    console.log("Connection with MongoDB Successful");
});

mongoose.connect(INDEX.DBURL, options);