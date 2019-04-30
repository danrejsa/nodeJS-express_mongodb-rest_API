const Users = require("../models/user");
var express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();


router.post("/", (req, res) => {
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

  router.get("/:id", (req, res) => {
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


  router.get("/", (req, res) => {
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


  router.delete("/:id", (req, res) => {
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


  router.patch("/:id", (req, res) => {
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

  module.exports = router;