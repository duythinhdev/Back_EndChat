const express = require("express");
const router = express.Router();
const userController = require('../../controllers/users');
const checkToken = require("../../middleware/check-auth")

router.post("/signups", userController.signup_user);
router.post("/login",checkToken, userController.login_user)
router.post("/googlelogin", userController.googleLogin_user)
router.post("/facebooklogin", userController.googleLogin_user)
router.delete("/:id",checkToken,userController.delete_user)
module.exports = router;
