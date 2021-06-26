const express = require("express");
const router = express.Router();
const chat = require('../../controllers/chat');

router.post("/convertStation",chat.ConvertStation)
router.get('/getUserIdConvert',chat.ConvertStationGetUserId)
module.exports = router;
