const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    travels: [{ type: Schema.Types.ObjectId, ref: 'travel', }],
    adventures: [{type: Schema.Types.ObjectId, ref: 'adventure', }]
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
