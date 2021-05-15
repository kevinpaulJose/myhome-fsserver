var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.put("/", function (req, res, next) {
  var primary_path = req.headers.primarypath;
  var old_path = primary_path + req.body.oldpath;
  var new_path = primary_path + req.body.newpath;
  fs.rename(old_path, new_path, (err) => {
    if (err) {
      res.send({
        message: err.message,
        response: "Error",
      });
    } else {
      res.send({
        response: "Success",
      });
    }
  });
});

module.exports = router;
