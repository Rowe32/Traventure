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
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('travels', {
  ref: 'travel', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'owner', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = model("user", userSchema);

module.exports = User;
