const router = require("express").Router();
const bcrypt = require("bcryptjs");
const requireLogin = require("../middleware/routeGuard");
const User = require("../models/User.model");
const Travel = require("../models/Travel.model");

router.use(requireLogin);

router.get("/:username", (req, res) => {
    //req.params.username
    res.render('profile', { user : req.session.currentUser });
})

router.get("/:username/travels", (req, res) => {
    res.render('travelList', { user : req.session.currentUser });
})


module.exports = router;