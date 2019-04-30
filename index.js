const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const comments = require("./routes/comments");
const users = require("./routes/users");
const books = require("./routes/books");
const genres = require("./routes/genres");

mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
  useNewUrlParser: true
});

app.use("/comments", comments);
app.use("/users", users);
app.use("/books", books);
app.use("/genres", genres);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;



