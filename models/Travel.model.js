const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user' },

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
    experience: String, 
    photo: String
   
  },
  {
    timestamps: true,
  }
);

const Travel = model("travel", travelSchema);

module.exports = Travel;
