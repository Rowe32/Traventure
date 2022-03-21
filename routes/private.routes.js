const router = require("express").Router();
const mongoose = require("mongoose")
const requireLogin = require("../middleware/routeGuard");
const User = require("../models/User.model");
const Travel = require("../models/Travel.model");

router.use(requireLogin);


router.get("/test", async (req, res) => {
    const user = await User.find().populate('travels');
    console.log("Heyy its me", user[0].travels)
    res.send("Send nothing")
  })
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
    const owner = await User.findOne({username: req.params.username})
    const newTravel = {
        owner,
        country: country,
        cities: cities,
        dateStart: dateStart,
        dateEnd: dateEnd,
    }
    await Travel.create(newTravel);
    
    res.redirect(`/private/${req.params.username}/travels`);
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return next(err);
  
      res.redirect("/login");
    })
  })

module.exports = router;
