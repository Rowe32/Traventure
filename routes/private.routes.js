const router = require("express").Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/routeGuard");
const User = require("../models/User.model");
const Travel = require("../models/Travel.model");
const Adventure = require("../models/Adventure.model");
const countryNames = require("../db/countryNames");

router.use(requireLogin);


// PROFILE PAGE
router.get("/:username", (req, res) => {
  res.render("profile", { user: req.session.currentUser });
});

// display all travels created by user:
router.get("/:username/travels", async (req, res) => {

  const allTravels = await Travel.find({owner: req.session.currentUser._id })

  res.render("travelList", {
    user: req.session.currentUser,
    travels: allTravels,
  });
});

// create new travel if user adds country via world map
router.post("/:username/travels", async (req, res) => {
  const owner = await User.findOne({
    username: req.session.currentUser.username,
  });
  const country = req.body.country;
  const newTravel = {
    owner,
    country,
    dateStart: new Date(),
    dateEnd: new Date(),
  };
  await Travel.create(newTravel);
  const travelFromDb = await Travel.findOne({ country: country });
  // we can change this and make the list just through selecting the owner of the lists
  await User.findOneAndUpdate(
    { username: req.params.username },
    { $push: { travels: travelFromDb._id } }
  );
  res.send("Successful changes");
});


// delete travel entry
router.post("/:username/travels/delete", async (req, res) => {
  const travelID = req.body.id;
  await Travel.findByIdAndDelete(travelID);
  await User.findOneAndUpdate({ username : req.session.currentUser.username }, { $pull : { travels: travelID } })
  res.redirect(`/private/${ req.session.currentUser.username }/travels`);
});

// display individual travel entry (pre-filled if edited before)
router.get("/:username/travels/:id", async(req, res) => {
  const travelFromDb = await Travel.findOne({ _id: req.params.id });
  // console.log( travelFromDb.dateStart instanceof Date ) // to check class instance
  const dateStart = travelFromDb.dateStart.toISOString().split("T")[0];
  const dateEnd = travelFromDb.dateEnd.toISOString().split("T")[0];
  res.render("travelDetails", {
    user: req.session.currentUser,
    entry: {...travelFromDb._doc, dateStart, dateEnd },
    countryNames: countryNames,
  });
});


// save edited travel entry
router.post("/:username/travels/:id", async (req, res, next) => {
  const { country, cities, dateStart, dateEnd } = req.body;
  const updatedTravel = {
    country: country,
    cities: cities,
    dateStart: dateStart,
    dateEnd: dateEnd,
    year: Number(dateStart.slice(0, 4)),
  };
  await Travel.findByIdAndUpdate({_id: req.params.id}, updatedTravel)
  res.redirect(`/private/${req.params.username}/travels`);
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

module.exports = router;
