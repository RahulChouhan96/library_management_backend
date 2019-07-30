let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

const INDEX = require("./app/model");

let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:"application/json"}));

app.listen(INDEX.PORT, INDEX.HOST, (error, response)=>{
    if(error){
        console.log("Error occurred while loading the server at port", INDEX.PORT, error);
    }else{
        console.log("Server is running successfully at port", INDEX.PORT);
    }
});