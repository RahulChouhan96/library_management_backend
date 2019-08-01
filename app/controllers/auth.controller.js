let mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

let INDEX = require("../model");

let Member = mongoose.model("Member");
let Admin = mongoose.model("Admin");
let Librarian = mongoose.model("Librarian");


module.exports.tokenValidator = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        console.log("No token provided");
        res
            .status(404)
            .send({
                "auth": false,
                "message": "No token provided"
            })
    } else {
        jwt.verify(token, INDEX.SCRTKEY, (error, response) => {
            if (error) {
                console.log("Invalid Token");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Invalid Token",
                        "error": error
                    });
            } else {
                console.log("Valid Token");
                next();
            }
        });
    }
}

module.exports.memberRegister = (req, res, next) => {
    let body = req.body;

    if (body && body.name && body.email && body.password) {
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashPassword = bcrypt.hashSync(body.password, salt);

        let newMember = new Member({
            "name": body.name,
            "email": body.email,
            "password": hashPassword,
            "id": shortId.generate,
            "joinDate": Date.now(),
        });

        newMember
            .save((error, response) => {
                if (error) {
                    if (error.errmsg.includes("duplicate")) {
                        console.log("Member already exists with the given email");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Member already exists with the given email",
                                "error": error
                            });
                    } else {
                        console.log("Error while adding a user profile");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Error while adding a user profile",
                                "error": error
                            });
                    }
                } else {
                    console.log("Member Profile added Successfully");
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Member Profile added Successfully",
                            "response": response
                        });
                }
            });
    } else {
        console.log("Required fileds not passed");
        res
            .status(404)
            .send({
                auth: false,
                message: "Required fileds not passed"
            });
    }
}

module.exports.librarianRegister = (req, res, next) => {
    let body = req.body;

    if (body && body.name && body.email && body.password) {
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashPassword = bcrypt.hashSync(body.password, salt);

        let newLibrarian = new Librarian({
            "name": body.name,
            "email": body.email,
            "password": hashPassword,
            "id": shortId.generate,
            "joinDate": Date.now(),
        });

        newLibrarian
            .save((error, response) => {
                if (error) {
                    if (error.errmsg.includes("duplicate")) {
                        console.log("Librarian already exists with the given email");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Librarian already exists with the given email",
                                "error": error
                            });
                    } else {
                        console.log("Error while adding a user profile");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Error while adding a user profile",
                                "error": error
                            });
                    }
                } else {
                    console.log("Librarian Profile added Successfully");
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Librarian Profile added Successfully",
                            "response": response
                        });
                }
            });
    } else {
        console.log("Required fileds not passed");
        res
            .status(404)
            .send({
                auth: false,
                message: "Required fileds not passed"
            });
    }
}

module.exports.adminRegister = (req, res, next) => {
    let body = req.body;

    if (body && body.name && body.password && body.type === "admin") {
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashPassword = bcrypt.hashSync(body.password, salt);

        let newAdmin = new Admin({
            "name": body.name,
            "email": body.email,
            "password": hashPassword,
            "type": body.type,
            "joinDate": Date.now(),
        });

        newAdmin
            .save((error, response) => {
                if (error) {
                    if (error.errmsg.includes("duplicate")) {
                        console.log("Admin already exists with the given email");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Admin already exists with the given email",
                                "error": error
                            });
                    } else {
                        console.log("Error while adding an admin profile");
                        console.log(error);
                        res
                            .status(404)
                            .send({
                                "auth": false,
                                "message": "Error while adding an admin profile",
                                "error": error
                            });
                    }
                } else {
                    console.log("Admin Profile added Successfully");
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Admin Profile added Successfully",
                            "response": response
                        });
                }
            });
    }
}

module.exports.memberLogin = (req, res, next) => {
    let body = req.body;

    Member
        .findOne({ "email": body.email }, (error, response) => {
            if (error) {
                console.log("Error while searching a member");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a member",
                        "error": error
                    });
            } else if (!response) {
                console.log("No Member Present with the given member email");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No Member Present with the given member email"
                    });
            } else {
                console.log("Member is present with the given member email");
                let isUserAuth = bcrypt.compareSync(body.password, response.password);
                if (isUserAuth) {
                    console.log("Member authentication successfull");
                    let token = jwt.sign({ _id: response._id }, INDEX.SCRTKEY);
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Member Logged-in Successfully",
                            "token": token,
                            "response": {
                                name: response.name,
                                type: response.type,
                                id: response.id
                            }
                        });
                } else {
                    console.log(isUserAuth);
                    console.log("Invalid Password !");
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Invalid Password !"
                        });
                }
            }
        });
}

module.exports.librarianLogin = (req, res, next) => {
    let body = req.body;

    Librarian
        .findOne({ "email": body.email }, (error, response) => {
            if (error) {
                console.log("Error while searching a librarian");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a librarian",
                        "error": error
                    });
            } else if (!response) {
                console.log("No Member Present with the given librarian email");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No Member Present with the given librarian email"
                    });
            } else {
                console.log("Member is present with the given librarian email");
                let isUserAuth = bcrypt.compareSync(body.password, response.password);
                if (isUserAuth) {
                    console.log("Member authentication successfull");
                    let token = jwt.sign({ _id: response._id }, INDEX.SCRTKEY);
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Member Logged-in Successfully",
                            "token": token,
                            "response": {
                                name: response.name,
                                type: response.type,
                                id: response.id
                            }
                        });
                } else {
                    console.log(isUserAuth);
                    console.log("Invalid Password !");
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Invalid Password !"
                        });
                }
            }
        });
}

module.exports.adminLogin = (req, res, next) => {
    let body = req.body;

    Admin
        .findOne({ "email": body.email }, (error, response) => {
            if (error) {
                console.log("Error while searching an admin");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching an admin",
                        "error": error
                    });
            } else if (!response) {
                console.log("No Admin Present with the given user email");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No Admin Present with the given user email"
                    });
            } else {
                console.log("Admin is present with the given user email");
                let isUserAuth = bcrypt.compareSync(body.password, response.password);
                if (isUserAuth) {
                    console.log("Admin authentication successfull");
                    let token = jwt.sign({ _id: response._id }, INDEX.SCRTKEY);
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "Member Logged-in Successfully",
                            "token": token,
                            "user": {
                                name: response.name
                            }
                        });
                } else {
                    console.log(isUserAuth);
                    console.log("Invalid Password !");
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Invalid Password !"
                        });
                }
            }
        });
}