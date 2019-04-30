const Comments = require("../models/comment");
var express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();


router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.get("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

module.exports = router;
