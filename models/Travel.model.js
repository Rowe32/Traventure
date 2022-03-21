const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    cities: {
        type: [String],
    },
    travelName: String,
    dateStart: Date,
    dateEnd: Date,
    categories: {
        type: String,
        enum: ["backpack", "into the wild", "van", "city trip", "all inclusive" ],
    },
    Experience: String, 
    Photo: String
   
  },
  {
    timestamps: true,
  }
);

const Travel = model("Travel", travelSchema);

module.exports = Travel;
