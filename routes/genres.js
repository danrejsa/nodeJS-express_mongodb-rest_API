const Genres = require("../models/genre");
var express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();



router.post("/", (req, res) => {
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


  router.get("/:id", (req, res) => {
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


  router.get("/", (req, res) => {
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


  router.delete("/:id", (req, res) => {
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

  
  router.patch("/:id", (req, res) => {
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

  module.exports = router;