const express = require("express");

let authCtrl = require("../controllers/auth.controller");

let router = express.Router();

router
    .route("/memberRegister")
    .post(authCtrl.memberRegister);

router
    .route("/librarianRegister")
    .post(authCtrl.librarianRegister);

router
    .route("/adminRegister")
    .post(authCtrl.adminRegister);

router
    .route("/memberLogin")
    .post(authCtrl.memberLogin);

router
    .route("/adminLogin")
    .post(authCtrl.adminLogin);

module.exports = router;