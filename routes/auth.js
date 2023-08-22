const express = require("express");
const router = express.Router();
const { body, validationResult} = require("express-validator");
const User = require("../model/user");
const { dataLayout } = require("../utils/template");

router.get("/login", (req, res) => {
  // res.render("login", {
  //   layout: "layouts/main-layouts",
  //   title: "Login",
  // });
  res.render("login", dataLayout(req,  {
    title:'Login'
  }));
});

router.post(
  "/login",
  [
    body("username").custom(async (value, { req,res }) => {
      const checkUser = await User.findOne({ username: value });
      
      if (!checkUser) {
        throw new Error("Username atau Password salah");
      } else if (req.body.password != checkUser.password) {
        throw new Error("Username atau Password salah");
      } else {
        const user = await User.findOne({ username: req.body.username });
        req.user = user
        // res.cookie('user', JSON.stringify(user));
        return true;
      }
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // console.log(req.user)
    if (!errors.isEmpty()) {
      res.render("login",dataLayout(req,{
        title: "Login",
        errors: errors.array(),
      }));
      
    } else {
      res.cookie('user', JSON.stringify(req.user))
      req.flash("msg", `SELAMAT DATANG ${req.user.name} `);
      res.redirect("/home");
    }
  }
);

router.get("/logout", (req, res) => {

  res.clearCookie("user")
  req.flash("msg", `Anda sudah Logout`);
  res.redirect("/home");
});

module.exports = router;
