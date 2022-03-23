const router = require("express").Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/routeGuard");
const User = require("../models/User.model");
// const Travel = require("../models/Travel.model");
const Adventure = require("../models/Adventure.model");
const countryNames = require("../db/countryNames");

router.use(requireLogin);

router.get("/:username/adventures", async (req, res) => {
  const allAdventures = await Adventure.find({owner: req.session.currentUser._id });
  res.render("adventureList", {
    user: req.session.currentUser,
    adventures: allAdventures,
  });
});

router.post("/:username/adventures", async (req, res) => {
  const owner = await User.findOne({
    username: req.session.currentUser.username,
  });
  const country = req.body.country;
  const newAdventure = {
    owner,
    country,
    dateStart: new Date(),
    dateEnd: new Date(),
  };
  await Adventure.create(newAdventure);
  const adventureFromDb = await Adventure.findOne({ country: country });
  await User.findOneAndUpdate(
    { username: req.params.username },
    { $push: { adventures: adventureFromDb._id } }
  );
  res.send("Successful changes");
});

router.post("/:username/adventures/delete", async (req, res) => {
  const adventureID = req.body.id;
  await Adventure.findByIdAndDelete(adventureID);
  await User.findOneAndUpdate({ username : req.session.currentUser.username }, { $pull : { adventures: adventureID } })
  res.redirect(`/private/${ req.session.currentUser.username }/adventures`);
});


router.get("/:username/adventures/:id", async(req, res) => {
  const adventureFromDb = await Adventure.findOne({ _id: req.params.id });
  const dateStart = adventureFromDb.dateStart.toISOString().split("T")[0];
  const dateEnd = adventureFromDb.dateEnd.toISOString().split("T")[0];
  res.render("adventureDetails", {
    user: req.session.currentUser,
    entry: {...adventureFromDb._doc, dateStart, dateEnd },
    countryNames: countryNames,
  });
});

router.post("/:username/adventures/:id", async (req, res, next) => {
  const { country, cities, dateStart, dateEnd } = req.body;

  const updatedAdventure = {
    country: country,
    cities: cities,
    dateStart: dateStart,
    dateEnd: dateEnd,
    year: Number(dateStart.slice(0, 4)),
  };
  await Adventure.findByIdAndUpdate({_id: req.params.id}, updatedAdventure)
 
  res.redirect(`/private/${req.params.username}/adventures`);
});

module.exports = router;
