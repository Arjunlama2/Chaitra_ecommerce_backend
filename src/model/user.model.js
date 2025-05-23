const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
  

    email: {
      type: String,
      required: true,

      validate: {
        validator: async (value) => {
          let matched = await mongoose.models.User.findOne({ email: value });
          if (matched) {
            return false;
          }
        },
        message: "email already used",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
