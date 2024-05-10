//   const auth = require("../middleware");

const {
  registerUser,
} = require("../controllers/UsersController/UsersController");

const router = require("express").Router();

router.post("/register", registerUser);

module.exports = router;
