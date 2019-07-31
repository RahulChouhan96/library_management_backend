let mongoose = require("mongoose");
let shortId = require("shortid");

let Book = mongoose.model("Book");
let User = mongoose.model("User");
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
    let issuedBookId = shortId.generate;
    if (body && body.memberId && body.bookId && body.librarianId) {
        Book
            .findOne({ id: body.bookid })
            .exec((error, response) => {
                if (error) {
                    console.log("Error while searching a book");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while searching a book",
                            error: error
                        });
                } else {
                    if (response.totalNumberOfCopies > copiesIssuedBy.length) {
                        User
                            .find({ id: {$in: [body.memberId, body.]}  })
                            .exec((error2, response2) => {
                                if (error2) {
                                    console.log("Error while searching for user data");
                                    res
                                        .status(404)
                                        .send({
                                            auth: false,
                                            message: "Error while searching for user data",
                                            error: error2
                                        });
                                } else {
                                    response3.bookIssuedId.push(issuedBookId);
                                    res
                                        .status(200)
                                        .send({
                                            auth: true,
                                            message: "Book issued successfully",
                                            response: response3
                                        });
                                }
                            });
                    });
    } else {
        console.log("Copies not left for the book");
        res
            .status(404)
            .send({
                auth: false,
                message: "Copies not left for the book",
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
        let newReservedBook = new ReservedBook({
            memberId: body.memberId,
            bookId: body.bookId,
            date: Date.now(),
            librarianId: body.librarianId
        });

        newReservedBook
            .save((error, response) => {
                if (error) {
                    console.log("Error while reserving book");
                    res
                        .status(404)
                        .send({
                            auth: false,
                            message: "Error while reserving book",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .send({
                            auth: true,
                            message: "Book reserved successfully",
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

module.exports.bookIssuedBy = (req, res, next) => {
    let body = req.body;
    if (body && body.bookId) {
        Book
            .find({ id: body.bookId })
            .exec((error, response) => {
                if (error) {

                } else {
                    User
                        .find({ id: { $in: response.copiesIssuedBy } })
                        .exec((error2, response2) => {
                            if (error2) {
                                console.log("Error while searching the issued book");
                                res
                                    .status(404)
                                    .send({
                                        auth: false,
                                        message: "Error while searching the issued book",
                                        error: error2
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

// module.exports.bookByName = (req, res, next)=>{
//     let body = req.body;
//     if(body && body.id){
//         Book
//         .findOne()
//     }
// }