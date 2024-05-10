const mongoose = require("mongoose");

const timeStamps = require("mongoose-timestamp");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  token: {
    type: String,
    required: false,
  },
});

UsersSchema.plugin(timeStamps, {
  createdAt: "created_at",

  updatedAt: "updated_at",
});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;
