const router = require("express").Router();
const mongoose = require("mongoose")
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

router.get("/:username/travels/:id", (req, res) => {
    res.render('travelDetails', { user : req.session.currentUser });
})

router.post("/:username/travels/:id", async(req, res, next) => {
    const {country, cities, dateStart, dateEnd} = req.body;
    
    const newTravel = {
        country: country,
        cities: cities,
        dateStart: dateStart,
        dateEnd: dateEnd,
    }
    console.log("newTravel", newTravel);

    await Travel.create(newTravel);

    const userFromDb = await User.findOne({username: req.params.username});
    await userFromDb.populate("travels");

    console.log("This is userFromDb", userFromDb);

    res.redirect(`/private/${req.params.username}/travels`);
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return next(err);
  
      res.redirect("/login");
    })
  })

module.exports = router;
