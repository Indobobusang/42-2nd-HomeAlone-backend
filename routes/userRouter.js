const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/kakaoLogin", userController.kakaoLogin);

module.exports = { router };
