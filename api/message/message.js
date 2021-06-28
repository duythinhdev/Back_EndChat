const express = require("express");
const router = express.Router();
const message = require('../../controllers/message');

router.post("/messagechat",message.messagechat)
router.get("/getallmessage",message.getAllMessage)
module.exports = router;
