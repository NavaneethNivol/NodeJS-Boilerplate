var express = require('express');
var router = express.Router();

// var themes = require("../controllers/themeCtrl");
// var atcStrip = require("../controllers/atcStripCtrl");
var login = require("../controllers/loginCtrl");
var crud = require("../controllers/crud");

// // Login and onboarding
// router.post("/register", login.register);
// router.post("/login", login.login);

router.post('/create/kv', crud.create);
router.get('/get/kv', crud.get);


module.exports = router;
