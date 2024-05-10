const mongoose = require("mongoose");

const dbURI =
  process.env.NODE_ENV === "DEVELOPMENT"
    ? process.env.DEV_DATABASE
    : process.env.PROD_DATABASE;

const connectDb = async () => {
  try {
    await mongoose.connect(dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database is connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
