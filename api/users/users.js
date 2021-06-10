const express = require("express");
const router = express.Router();
const userController = require('../../controllers/users');
const check = require("../../middleware/check-auth")

router.post("/signups", userController.signup_user);
router.post("/login", userController.login_user)
router.post("/googlelogin", userController.googleLogin_user)
router.delete("/:id",check,userController.delete_user)
module.exports = router;
