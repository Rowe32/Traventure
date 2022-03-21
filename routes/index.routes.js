const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("password", salt);

    const user = {
      username: username,
      email: email,
      password: hash,
    };

    await User.create(user);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("signup", { error: "This is an error" });
  }
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, loggedUser.password);

    if (checkPassword) {
      req.session.currentUser = loggedUser;
      res.redirect("/profile");
    }
  } catch (err) {
    console.error(err);
    res.render("login", { error: "This is an error" });
  }
});

module.exports = router;
