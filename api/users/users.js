const express = require("express");
const router = express.Router();
const userController = require('../../controllers/users');

router.post("/signup",userController.userSignup);
router.post("/login",userController.userLogins)

module.exports = router;
