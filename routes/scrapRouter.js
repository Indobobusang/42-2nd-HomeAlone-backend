const express = require("express");
const scrapController = require("../controllers/scrapController");

const router = express.Router();
const { loginRequired } = require("../middlewares/auth");

router.post("", loginRequired, scrapController.postScrap);
router.get("", loginRequired, scrapController.getScraps);
router.delete("", loginRequired, scrapController.deleteScrap);

module.exports = { router };
