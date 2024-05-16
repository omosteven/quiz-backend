const express = require("express");
const controller = require("../controllers/UsersController/quizController");

const quizRouter = express.Router();

quizRouter.get("/", controller.getAllQuestions);
quizRouter.get("/:id", controller.getQuestionById);
quizRouter.post("/", controller.postQuestion);
quizRouter.put("/:id", controller.updateQuestion);
quizRouter.delete("/:id", controller.deleteQuestion);

module.exports = quizRouter