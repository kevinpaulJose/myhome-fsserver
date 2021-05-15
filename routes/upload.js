var express = require("express");
var multer = require("multer");
var router = express.Router();
const mkdirp = require("mkdirp");

// test

const up = multer();
router.post("/", function (req, res, next) {
  // res.send(req.body);

  var path = req.headers.filepath.split(" ").join("_");
  var primary_path = req.headers.primarypath;
  mkdirp(primary_path + path).then((made) => {
    console.log("PATH CREATED");
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, primary_path + path);
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname.split(" ").join("_"));
      },
    });

    var upload = multer({ storage: storage }).array("userFile", 20);
    upload(req, res, function (err) {
      if (err) {
        return res.send({
          response: "ERROR",
        });
      }
      res.send({
        response: "UPLOADED",
        req: req.files,
      });
    });
  });
});

module.exports = router;
