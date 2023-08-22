// const express = require('express');
// const router = express.Router();
// const User = require('../model/user');

// requireLevel = (level) => {
//     return (req, res, next) => {
//       if (req.session && req.session.user && req.session.user.userLevel === level) {
//         return next();
//       } else {
//         res.redirect('/login'); // Atau tampilkan pesan akses ditolak
//       }
//     };
//   }

// module.exports = {requireLevel}