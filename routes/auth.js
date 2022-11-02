const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const router = Router();
const { JWT_SECRET } = require("../config/key");

router.post("/signup", (req, res) => {
  const { name, phone, email, password, userName } = req.body;
  if (!email || !phone || !password || !userName) {
    return res
      .status(422)
      .json({ error: "Iltimos hamma bo'sh joylarni to'ldiring!" });
  }

  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "Bunday foydalanuvchi allaqachon mavjud" });
    }

    User.findOne({ userName }).then((savedOne) => {
      if (savedOne) {
        return res
          .status(422)
          .json({ error: "Bu foydalanuvchi nomi allaqachon mavjud" });
      }

      if (password.length < 8) {
        return res.status(422).json({
          error: "Parol eng kamida sakkizta belgidan iborat bo'lishi kerak!",
        });
      }

      bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new User({
          name,
          phone,
          email,
          password: hashedPassword,
          userName,
        });

        user.save().then((reggedUser) => {
          const token = jwt.sign({ _id: reggedUser._id }, JWT_SECRET);
          res.json({
            token,
            user: reggedUser,
            msg: "Foydalanuvchi muvaffaqiyatli saqlandi",
          });
        });
      });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Iltimos hamm bo'sh joylarni to'ldiring" });
  }

  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Email yoki parol xato!" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((domatch) => {
        if (domatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, phone, userName } = savedUser;
          res.json({
            token,
            user: { _id, name, email, phone, userName },
            msg: "Siz muvaffaqiyatli kridingiz",
          });
        } else {
          return res.status(422).json({ error: "Email yoki parol xato" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
