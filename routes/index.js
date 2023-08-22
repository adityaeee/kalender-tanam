const express = require("express");
const { dataLayout } = require("../utils/template");
const router = express.Router();

router.get("/", function (req, res, next) {
  // req.flash('msg');
  res.render("home", dataLayout(req,  {
    title:'Home'
  }));
});

module.exports = router;
