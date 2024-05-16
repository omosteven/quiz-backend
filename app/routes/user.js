const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

require("../middleware/AuthWare/AuthWare");

router.post(
  "/register",
  passport.authenticate("register", { session: false }), async (req, res, next) => {
    res.json({
      message: "Regitered successfully!",
      user: req.user
    })
  }
)

router.post(
  "/login",
  async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        if (!user) {
          const error = new Error("Username or password is incorrect");
          return next (error)
        }

        req.login(user, { session: false }, 
          async (error) => {
            if (error) {
              return next(error)
            }
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

            return res.json({ token })
          }
        )
      } catch (error) {
        return next(error);
      }
    })
    (req, res, next);
  }
)

module.exports = router