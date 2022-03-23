const { Schema, model } = require("mongoose");

const adventureSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user' },

    country: {
      type: String,
      required: true,
    },
    cities: {
        type: [String],
    },
    adventureName: String,
    dateStart: Date,
    dateEnd: Date,
    year: Number,
    categories: {
        type: String,
        enum: ["backpack", "into the wild", "van", "city trip", "all inclusive" ],
    },
  },
  {
    timestamps: true,
  }
);

const Adventure = model("adventure", adventureSchema);

module.exports = Adventure;
