const Books = require("../models/book");
var express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();


router.post("/", (req, res) => {
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




  router.get("/:id", (req, res) => {
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



  router.get("/", (req, res) => {
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

  router.delete("/:id", (req, res) => {
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


  router.patch("/:id", (req, res) => {
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

  module.exports = router;