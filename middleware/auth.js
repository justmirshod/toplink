const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
const mongoose = require("mongoose");
const User = require("../Models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Siz bu saytda ro'yxatdan o'tgna bo'lishingiz kerak!" });
  }

  const token = authorization.replace("Mirshod ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json(
          "Avtorizatsiya tasdiqlanmadi, iltimoas keyinroq qaytadan urinib koring"
        );
    }

    const { _id } = payload;
    User.findById(_id).then((user) => {
      req.user = user;
      next();
    });
  });
};
