const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

  password: {
    type: String,
    required: true
  }
});


  // role: {
  //   type: String,
  //   enum: [admin, user],
  //   required: true
  // }

UsersSchema.plugin(timeStamps, {
  createdAt: "created_at",

  updatedAt: "updated_at",
});

UsersSchema.pre(
  "save",
  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
)

UsersSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, this.password);

  return compare;
}

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;
