var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.listen(port, () => console.log(`listening on port ${port}`));

const Books = require("./models/book");
const Genres = require("./models/genre");
const Users = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
  useNewUrlParser: true
});

//POST HANDLER
//post user
app.post("/users", (req, res) => {
  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    classy: req.body.classy
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /users",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//post book
app.post("/books", (req, res) => {
  const book = new Books({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    pages: req.body.pages,
    img_url: req.body.img_url,
    buy_url: req.body.buy_url
  });
  book
    .save()
    .then(result => {
      res.status(200).json({
        message: "Handling post request to /books",
        createdBook: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//post genre
app.post("/genres", (req, res) => {
  const genre = new Genres({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });

  genre
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//GET HANDLER
//single user
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(500)
          .json({ message: "Request with the given id not found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//single book
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  Books.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({
          message: "User with the given id does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//single genre
app.get("/genres/:id", (req, res) => {
  const id = req.params.id;
  Genres.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({
          message: "Genre with the given id does not exist"
        });
      }
    })
    .catch(err => [
      res.status(500).json({
        error: err
      })
    ]);
});

//Get users
app.get("/users", (req, res) => {
  Users.find()
    .exec()
    .then(results => {
      console.log(results);
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Get books
app.get("/books", (req, res) => {
  Books.find()
    .exec()
    .then(books => {
      console.log(books);
      res.status(200).json(books);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Get Genres
app.get("/genres", (req, res) => {
  Genres.find()
    .exec()
    .then(genre => {
      console.log(genre);
      res.status(200).json(genre);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

//DELETE HANDLER
//delete user
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove({ _id: id })
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "User with the given id does not exist"
      });
    });
});

//delete book
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  Books.remove({
    _id: id
  })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Book with the given id does not exist"
      });
    });
});

//delete genre
app.delete("/genres/:id", (req, res) => {
  const id = req.params.id;
  Genres.remove({
    _id: id
  })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Genre with the given id does not exist"
      });
    });
});

//PATCH HANDLER
//update user
app.patch("/users/:id", (req, res) => {
  const id = req.params.id;

  Users.update(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        classy: req.body.classy
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//update book
app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  Books.update(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        pages: req.body.pages,
        img_url: req.body.img_url,
        buy_url: req.body.buy_url
      }
    }
  )
    .exec()
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      res.status(500).json({
        message: "Books with the given id does not exist"
      });
    });
});

//update genre
app.patch("/genres/:id", (req, res) => {
  const id = req.params.id;
  Genres.update(
    { _id: id },
    {
      $set: {
        name: req.body.name
      }
    }
  )
    .exec()
    .then(genre => {
      res.status(200).json(genre);
    })
    .catch(err => {
      res.status(500).json({
        message: "Genre with the given id does not exist"
      });
    });
});

/*const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Users.update({_id: id}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })*/
