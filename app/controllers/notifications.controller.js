const mongoose = require("mongoose");

let Librarian = mongoose.model("Librarian");
let Member = mongoose.model("Member");

module.exports.reservedBook = (req, res, next) => {
    let body = req.body;
    if (body && body.librarianId && body.memberId && body.bookId) {
        Librarian
            .updateOne({ id: body.librarianId }, { reservedNotification: { $push: { bookId: body.bookId, memberId: body.memberId } } })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching a librarian");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching a librarian",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Notification sent successfully",
                            response: response
                        });
                }
            });
    } else {
        console.log("Parameters are missing");
        res
            .staus(404)
            .send({
                auht: false,
                message: "Parameters are missing"
            });
    }
}

module.exports.bookPosted = (req, res, next) => {
    let body = req.body;
    if (body && body.librarianId && body.bookId) {
        Librarian
            .findOne({ id: body.librarianId }, { _id: 0, reservedBooks: 1 })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching a librarian");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching a librarian",
                            error: error
                        });
                } else {
                    let memberId = response.reservedBooks.find(element => {
                        if (element.bookId == body.bookId) {
                            return element.memberId
                        }
                    });
                    Member
                        .find({ id: memberId }, { _id: 0, reservedBooks: 1 })
                        .exec((error2, response2) => {
                            if (error2) {
                                console.log("Error while searching a member");
                                res
                                    .status(404)
                                    .send({
                                        auth: false,
                                        message: "Error while searching a member",
                                        error: error2
                                    });
                            } else {
                                response2.forEach(element => {
                                    element.reservedBooks.posted = true;
                                });
                                res
                                    .status(200)
                                    .send({
                                        auth: true,
                                        message: "Notified to the member"
                                    });
                            }
                        });
                }
            });
    } else {
        console.log("Parameters are missing");
        res
            .staus(404)
            .send({
                auht: false,
                message: "Parameters are missing"
            });
    }
}