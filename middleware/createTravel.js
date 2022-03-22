const mongoose = require("mongoose")
const User = require("../models/User.model");
const Travel = require("../models/Travel.model");


const createTravel = async (req, res, next) => {
    
    // const owner = await User.findOne({username: req.params.username})
        // const newTravel = {
        //     owner,
        //     country,
        // }
        // await Travel.create(newTravel);
        next();
}

module.exports = createTravel;
