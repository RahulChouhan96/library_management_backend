require("./app/model/db.connection");

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

let authRoutes = require("./app/routes/auth.routes");
let bookRoutes = require("./app/routes/book.routes");
let notificationsRoutes = require("./app/routes/notifications.routes");

const INDEX = require("./app/model");

let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
    next();
  });

app.use("/libraryManagement", authRoutes);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:"application/json"}));

app.use("/libraryManagement", authRoutes);
app.use("/libraryManagement", bookRoutes);
app.use("/libraryManagement", notificationsRoutes);

app.listen(INDEX.PORT, INDEX.HOST, (error, response)=>{
    if(error){
        console.log("Error occurred while loading the server at port", INDEX.PORT, error);
    }else{
        console.log("Server is running successfully at port", INDEX.PORT);
    }
});