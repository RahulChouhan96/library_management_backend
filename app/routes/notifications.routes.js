const express = require("express");

let notificationsCtrl = require("../controllers/notifications.controller");

let router = express.Router();

router
    .route("/reservedBook")
    .post(notificationsCtrl.reservedBook);

router
    .route("/bookPosted")
    .post(notificationsCtrl.bookPosted);

module.exports = router;