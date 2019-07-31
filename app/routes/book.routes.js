const express = require("express");

let bookCtrl = require("../controllers/book.controller");
let router = express.Router();

router
    .route("/allBooksByCategory")
    .get(bookCtrl.allBooksByCategory);

router
    .route("/suggestionsForTitle")
    .post(bookCtrl.suggestionsForTitle);

router
    .route("/suggestionsForAuthor")
    .post(bookCtrl.suggestionsForAuthor);

router
    .route("/booksByCategory")
    .post(bookCtrl.booksByCategory);

router
    .route("/booksByPublicationDate")
    .post(bookCtrl.booksByPublicationDate);

router
    .route("/allBooksOneLibrarian")
    .post(bookCtrl.allBooksOneLibrarian);

router
    .route("/getOneBook")
    .post(bookCtrl.getOneBook);

router
    .route("/postBook")
    .post(bookCtrl.postBook);

router
    .route("/issueBook")
    .post(bookCtrl.issueBook);

router
    .route("/reserveBook")
    .post(bookCtrl.reserveBook);

router
    .route("/bookIssuedBy")
    .post(bookCtrl.bookIssuedBy);
// router
// .route("/bookByName")
// .post(bookCtrl.bookByName);

module.exports = router;