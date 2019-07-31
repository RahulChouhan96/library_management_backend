let mongoose = require("mongoose");
let shortId = require("shortid");
let async = require("async");

let Book = mongoose.model("Book");
let Member = mongoose.model("Member");
let Librarian = mongoose.model("Librarian");
let IssuedBook = mongoose.model("IssuedBook");
let ReservedBook = mongoose.model("ReservedBook");

let categories = ["science", "adventure", "maths"];

module.exports.allBooksByCategory = (req, res, next) => {
    Book
        .find({}, { _id: 0, bookId: 0 })
        .exec((error, response) => {
            if (error) {
                console.log("Error while fetching books data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while fetching books data",
                        error: error
                    });
            } else {
                if (response.length <= 0) {
                    console.log("No book data present");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "No book data present",
                        });
                } else {
                    let index = 0;
                    let booksCategorised = [];
                    while (index < categories.length) {
                        booksCategorised[index] = {
                            category: categories[index],
                            books: Book.aggregate([{ $match: { category: categories[index] } }])
                        }
                        index++;
                    }
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Books by category found successfully",
                            response: booksCategorised
                        });
                }
            }
        });
}

module.exports.suggestionsForTitle = (req, res, next) => {
    let body = req.body;
    let bookTitles = [];
    // bookNames = Book.aggregate([{$match: {

    // }}])
    Book
        .find({}, { title: 1 })
        .exec((error, response) => {
            if (error) {
                console.log("Error while fetching book titles");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while fetching book titles",
                        error: error
                    });
            } else {
                response.find(element => {
                    bookNames.push(element.title.includes(body.text));
                });
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "Suggestions found successfully",
                        response: bookNames
                    });
            }
        });
}

module.exports.suggestionsForAuthor = (req, res, next) => {
    let body = req.body;
    let auhtors = [];
    // bookNames = Book.aggregate([{$match: {

    // }}])
    Book
        .find({}, { author: 1 })
        .exec((error, response) => {
            if (error) {
                console.log("Error while fetching book authors");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while fetching book authors",
                        error: error
                    });
            } else {
                response.find(element => {
                    auhtors.push(element.author.includes(body.text));
                });
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "Suggestions found successfully",
                        response: auhtors
                    });
            }
        });
}

module.exports.booksByCategory = (req, res, next) => {
    let body = req.body;
    if (body && body.category) {
        Book
            .find({ category: body.category })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while fetching book by category");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while fetching book by category",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Books with category found successfully",
                            response: response
                        });
                }
            });
    } else {
        console.log("Category for the book not found");
        res
            .staus(404)
            .send({
                auht: false,
                message: "Category for the book not found"
            });
    }
}

module.exports.booksByPublicationDate = (req, res, next) => {
    let body = req.body;
    if (body && body.dateOfPublication) {
        Book
            .find({ dateOfPublication: body.dateOfPublication })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while fetching book by date of publication");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while fetching book by date of publication",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Books with date of publication found successfully",
                            response: response
                        });
                }
            });
    } else {
        console.log("Enter Date of publication for the book");
        res
            .staus(404)
            .send({
                auht: false,
                message: "Enter Date of publication for the book"
            });
    }
}

module.exports.allBooksOneLibrarian = (req, res, next) => {
    let body = req.body;
    if (body && body.librarianId) {
        Book
            .find({ librarianId: body.librarianId })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while fetching all books by one librarian");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while fetching all books by one librarian",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "All Books for one librarian found successfully",
                            response: response
                        });
                }
            });
    } else {
        console.log("Enter email of librarian");
        res
            .staus(404)
            .send({
                auht: false,
                message: "Enter email of librarian"
            });
    }
}

module.exports.getOneBook = (req, res, next) => {
    let body = req.body;
    if (body && body.id) {
        Book
            .find({ id: body.id })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while fetching one book");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while fetching one book",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Book found successfully",
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

module.exports.postBook = (req, res, next) => {
    let body = req.body;
    if (body && body.title && body.isbn && body.author && body.category && body.language && body.dateOfPublication && body.numberOfPages &&
        body.numberOfCopies && body.librarianId) {
        let newBook = new Book({
            title: body.title,
            isbn: body.isbn,
            author: body.author,
            category: body.category,
            language: body.language,
            dateOfPublication: body.dateOfPublication,
            numberOfPages: body.numberOfPages,
            numberOfCopies: body.numberOfCopies,
            librarianId: body.librarianId
        });
        newBook
            .save((error, response) => {
                if (error) {
                    console.log("Error while saving book");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while saving book",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Book saved successfully",
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

module.exports.issueBook = (req, res, next) => {
    let body = req.body;
    if (body && body.memberId && body.bookId && body.librarianId) {
        Member
            .findOne({ id: body.memberId }, { _id: 0, booksIssued: 1 })
            .exec((error, response2) => {
                if (error) {
                    console.log("Error while searching for one member");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching for one member",
                            error: error
                        });
                } else {
                    if (response2.booksIssued.length < 5) {
                        async.parallel([
                            function (callback) {
                                Member
                                    .updateOne({ id: body.memberId }, { booksIssued: { $push: body.bookId } })
                                    .exec((error, response) => {
                                        if (error) {
                                            callback(error);
                                        } else {
                                            callback(null, response);
                                        }
                                    });
                            }, function (callback) {
                                let dueDate = new Date();
                                let issuedBookInfo = {
                                    bookId: body.bookId,
                                    memberId: body.memberId,
                                    issuingDate: Date.now(),
                                    dueDate: dueDate.setDate(dueDate.getDate() + 10)        // Defining due date
                                }
                                Librarian
                                    .updateOne({ id: body.memberId }, { issuedBooksInfo: { $push: issuedBookInfo } })
                                    .exec((error, response) => {
                                        if (error) {
                                            callback(error);
                                        } else {
                                            callback(null, response);
                                        }
                                    });
                            }
                        ], function (error, results) {
                            if (error) {
                                res
                                    .status(404)
                                    .send({
                                        auth: false,
                                        error: error
                                    });
                            } else {
                                res
                                    .status(200)
                                    .send({
                                        auth: true,
                                        message: "Book issued successfully",
                                        response: results
                                    });
                            }
                        });

                    } else {
                        console.log("Limit of issuing books crossed");
                        res
                            .status(404)
                            .send({
                                auth: false,
                                message: "Limit of issuing books crossed"
                            });
                    }
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

module.exports.reserveBook = (req, res, next) => {
    let body = req.body;
    if (body && body.memberId && body.bookId && body.librarianId) {
        Member
            .updateOne({ id: body.memberId }, { reservedBooks: { $push: body.bookId } })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching a member");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching a member",
                            error: error
                        });
                } else {
                    Librarian
                        .updateOne({ id: body.librarianId }, { reservedNotification: { $push: { memberId: body.memberId, bookId: body.bookId } } })
                        .exec((error, response2) => {
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
                                        message: "Book reserved successfully",
                                        response: response2
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

module.exports.bookIsIssuedBy = (req, res, next) => {
    let body = req.body;
    if (body && body.librarianId && body.bookId) {
        Librarian
            .findOne({ id: body.librarianId })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching librarian data");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching librarian data",
                            error: error
                        });
                } else {
                    let members = [];
                    response.issuedBooksInfo.find(element => {
                        if (element.bookId == body.bookId) {
                            members.push(element.memberId);
                        }
                    });
                    Member
                        .find({ id: { $in: members } }, { _id: 0, name: 1, id: 1 })
                        .exec((error, response2) => {
                            if (error) {
                                console.log("Error while searching librarian data");
                                res
                                    .status(404)
                                    .send({
                                        auth: false,
                                        message: "Error while searching librarian data",
                                        error: error
                                    });
                            } else {
                                res
                                    .status(200)
                                    .send({
                                        auth: true,
                                        message: "Members issued book found successfully",
                                        response: response2
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

module.exports.bookIssuedByAMember = (req, res, next) => {
    let body = req.body;
    if (body && body.memberId) {
        Member
            .findOne({ id: body.memberId })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching librarian data");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching librarian data",
                            error: error
                        });
                } else {
                    Book
                        .find({ id: { $in: response.booksIssued } }, { _id: 0, title: 1, author: 1, id: 1 })
                        .exec((error, response2) => {
                            if (error) {
                                console.log("Error while searching librarian data");
                                res
                                    .status(404)
                                    .send({
                                        auth: false,
                                        message: "Error while searching librarian data",
                                        error: error
                                    });
                            } else {
                                res
                                    .status(200)
                                    .send({
                                        auth: true,
                                        message: "All the issued books found successfully",
                                        response: response2
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

module.exports.fine = (req, res, next) => {
    let body = req.body;
    if (body && body.bookId && body.memberId) {
        Librarian
            .find({ "issuedBooksInfo.bookId": body.bookId })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching librarian data");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching librarian data",
                            error: error
                        });
                } else {
                    if (new Date() > response.dueDate) {
                        Member
                            .findOne({ id: body.memberId }, { booksIssued: 1, _id: 0 })
                            .exec((error, response) => {
                                if (error) {
                                    console.log("Error while searching member data");
                                    res
                                        .status(404)
                                        .send({
                                            auth: false,
                                            message: "Error while searching member data",
                                            error: error
                                        });
                                } else {
                                    let booksIssued = [];
                                    response.booksIssued.find(element => {
                                        if (element == body.bookId) {
                                            booksIssued.push(element);
                                        }
                                    });
                                }
                            });
                    } else {
                        res
                            .status()
                    }
                }
            });


    } else {

    }
}

// module.exports.bookByName = (req, res, next)=>{
//     let body = req.body;
//     if(body && body.id){
//         Book
//         .findOne()
//     }
// }