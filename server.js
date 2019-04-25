var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
let router = express.Router();
app.listen(port, () => console.log(`listening on port ${port}`));
app.use("/", router);
const Books = require("./models/book");
const Genres = require("./models/genre");
const Users = require("./models/user");
const Comments = require("./models/comment");

mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
  useNewUrlParser: true
});

//POST HANDLER
//post user
router.post("/users", (req, res) => {
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

//post Comments
router.post("/comments", (req, res) => {
  const comment = new Comments({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    message: req.body.message
  });
  comment
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

//post book
router.post("/books", (req, res) => {
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
router.post("/genres", (req, res) => {
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

//single comment

router.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  Comments.findById(id)
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(200).json({
        error: err
      });
    });
});

//single user
router.get("/users/:id", (req, res) => {
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
router.get("/books/:id", (req, res) => {
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
router.get("/genres/:id", (req, res) => {
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
router.get("/users", (req, res) => {
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

//get Comments
router.get("/comments", (req, res) => {
  Comments.find()
    .exec()
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//Get books
router.get("/books", (req, res) => {
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
router.get("/genres", (req, res) => {
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

router.get("/", (req, res) => {
  res.send("hello world");
});

//DELETE HANDLER
//delete user
router.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  Users.deleteOne({ _id: id })
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

//delete comment

router.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  Comments.deleteOne({ _id: id })
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

//delete book
router.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  Books.deleteOne({
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
router.delete("/genres/:id", (req, res) => {
  const id = req.params.id;
  Genres.deleteOne({
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
router.patch("/users/:id", (req, res) => {
  const id = req.params.id;

  Users.updateOne(
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

//update comment

router.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  Comments.updateOne(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        message: req.body.message
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Request with the given id does not exist"
      });
    });
});

//update book
router.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  Books.updateOne(
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
router.patch("/genres/:id", (req, res) => {
  const id = req.params.id;
  Genres.updateOne(
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
