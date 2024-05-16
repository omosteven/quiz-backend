const Quiz = require("../../models/quizModel");

async function getAllQuestions(req, res) {
  try {
    const questions = await Quiz.find();
    res.status(200);
    res.send(questions);
  } catch (error) {
    res.status(500);
    res.json({
      err: err.message
    });
  }
}

async function getQuestionById(req, res) {
  try {
    const id = req.params.id;

    const question = await Quiz.findById(id);
    res.status(200);
    res.json({
      question: question
    })
  } catch (error) {
    res.status(500);
    res.json({
      err: error.message
    })
  }
}

async function postQuestion(req, res) {
  try {
    const body = req.body;

    const question = await Quiz.create(body);
    res.status(200);
    res.json({
      message: "Question added successfully",
      question: question
    })
  } catch (error) {
    res.status(500);
    res.json({
      err: error.message
    });
  }
}

async function updateQuestion(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    const question = await Quiz.findByIdAndUpdate(id, body, { new: true });
    res.status(201);
    res.json({
      message: "Updated Successfully"
    })
  } catch (error) {
    res.status(500);
    res.json({
      nessage: "unable to update",
      err: error.message
    })
  }
}

async function deleteQuestion(req, res) {
  try {
    const id = req.params.id;

    const question = await Quiz.findByIdAndDelete(id);
    res.status(200);
    res.json({
      message: "Question deleted successfully",
    })
  } catch (error) {
    res.status(500);
    res.json({
      message: "An error has occured",
      err: error.message
    })
  }
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  postQuestion,
  updateQuestion,
  deleteQuestion
}