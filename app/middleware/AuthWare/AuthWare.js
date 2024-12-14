const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstragegy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../../models/UsersModels");
require("dotenv").config();


passport.use(
  new JWTstragegy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const { role } = req.body;
        const user = await User.create({ email, password, role });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
)

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async ( email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Logged in successfully" });
         
      } catch (error) {
        return done (error);
      }
    }
  )
)

const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).send({ message: "Require Admin Role!"});
  }
  next();
}

module.exports = { isAdmin };