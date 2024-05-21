const express = require("express");

const dotenv = require("dotenv");

const bodyParser = require("body-parser");

const cors = require("cors");

const AppRoutes = require("./app/routes/index.js");

const QuizRoutes = require("./app/routes/quiz.js");

const AuthRoute = require("./app/routes/auth.js");

const connectDb = require("./config/Database");

dotenv.config();

const app = express();

app.use(express.json({ limit: "200mb" }));

app.use(bodyParser.urlencoded({ limit: "200mb", extended: false }));

app.use(bodyParser.json({ limit: "200mb" }));

//connecting the database
connectDb();

require("./app/middleware/AuthWare/AuthWare.js");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  
  const message = error.message;

  return res.status(status).json({ message: message, statusCode: status });
});

app.use("/api/v1", AppRoutes);

app.use("/auth", AuthRoute);

app.use("/quiz", QuizRoutes);

app.use("/*", (req, res) => {
  return res.status(404).json({
    message: "You missed the right route",
    route: req.originalUrl,
  });
});

const http = require("http").Server(app);

let port = process.env.PORT || 8000;

http.listen(port, function () {
  console.log("App is running");
});
