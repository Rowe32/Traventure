const router = require("express").Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/routeGuard");
const User = require("../models/User.model");
const Travel = require("../models/Travel.model");

router.use(requireLogin);

router.get("/test", async (req, res) => {
  const travel = await User.find().populate("travels");
  // console.log("Heyy its me", travel);
  res.send("Send nothing");
});
router.get("/:username", (req, res) => {
  //req.params.username
  res.render("profile", { user: req.session.currentUser });
});

router.get("/:username/travels", async (req, res) => {
  const owner = await User.findOne({ username: req.params.username }).populate(
    "travels"
  );
  const allTravelsOfOwner = owner.travels; //array of tavel objects
  res.render("travelList", {
    user: req.session.currentUser,
    travels: allTravelsOfOwner,
  });
});

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

router.post("/:username/travels/delete", async (req, res) => {
  const travelID = req.body.id;
  await Travel.findByIdAndDelete(travelID);
  await User.findOneAndUpdate({ username : req.session.currentUser.username }, { $pull : { travels: travelID } })
  res.redirect(`/private/${ req.session.currentUser.username }/travels`);
});


router.get("/:username/travels/:id", async(req, res) => {
  const travelFromDb = await Travel.findOne({ _id: req.params.id });
  res.render("travelDetails", {
    user: req.session.currentUser,
    entry: travelFromDb,
  });
});

router.post("/:username/travels/:id", async (req, res, next) => {
  const { country, cities, dateStart, dateEnd } = req.body;
  // console.log("this is 59", dateStart);
  console.log("Line 60", req.body);
  // console.log("Line 61", req.params.id);
  
  // console.log("hello from line 39", dateStart.slice(0, 4));
  // const owner = await User.findOne({ username: req.params.username });
  const updatedTravel = {
    // owner,
    country: country,
    cities: cities,
    dateStart: dateStart,
    dateEnd: dateEnd,
    year: Number(dateStart.slice(0, 4)),
  };
  await Travel.findByIdAndUpdate({_id: req.params.id}, updatedTravel)
  // await Travel.create(newTravel);
  // const travelFromDb = await Travel.findOne({ country: country });
  // await User.findOneAndUpdate(
  //   { username: req.params.username },
  //   { $push: { travels: travelFromDb._id } }
  // );
  res.redirect(`/private/${req.params.username}/travels`);
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

module.exports = router;
