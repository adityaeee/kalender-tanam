const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const User = require("../model/user");

router.get("/", (req, res) => {
  res.render("login", {
    layout: "layouts/main-layouts",
    title: "Login",
  });
});

router.post(
  "/",
  [
    body("username").custom(async (value, { req }) => {
      const checkUser = await User.findOne({ username: value });

      if (!checkUser) {
        throw new Error("Username tidak ada");
      } else if (req.body.password != checkUser.password) {
        throw new Error("Password salah");
      } else {
        return true;
      }
    }),
  ],
  (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login", {
        layout: "layouts/main-layouts",
        title: "Login",
        errors: errors.array(),
      });
    } else {
      req.flash("msg", `SELAMAT DATANG ${req.body.username} DI`);
      res.redirect("/home");
    }
  }
);

module.exports = router;
