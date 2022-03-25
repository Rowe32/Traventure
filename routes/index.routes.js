const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");


// HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});


// SIGN UP PAGE
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// create user in db
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

// login page
router.get("/login", (req, res, next) => {
  res.render("login");
});

// login check with db
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, loggedUser.password);

    if (checkPassword) {
      req.session.currentUser = loggedUser;
      res.redirect(`/private/${loggedUser.username}`);
    }
  } catch (err) {
    console.error(err);
    res.render("login", { error: "This is an error" });
  }
});

module.exports = router;
