const express = require("express");
const passport = require("passport");
const controller = require("../controllers/UsersController/quizController");
const AuthAdmin = require("../middleware/AuthWare/AuthWare");

const quizRouter = express.Router();

quizRouter.get("/", passport.authenticate("jwt", { session: false }), controller.getAllQuestions);
quizRouter.get("/:id", passport.authenticate("jwt", { session: false }), controller.getQuestionById);
quizRouter.post("/", [ passport.authenticate("jwt", { session: false }), AuthAdmin.isAdmin ], controller.postQuestion);
quizRouter.put("/:id", [ passport.authenticate("jwt", { session: false }), AuthAdmin.isAdmin ], controller.updateQuestion);
quizRouter.delete("/:id", [ passport.authenticate("jwt", { session: false }), AuthAdmin.isAdmin ], controller.deleteQuestion);

module.exports = quizRouter