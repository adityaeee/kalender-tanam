var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("menuPengelolaanData", {
    layout: "layouts/main-layouts",
    title: "KATAM || Pengelolaan Data",
  });
});

module.exports = router;
