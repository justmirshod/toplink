const { Router } = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const User = require("../Models/User");
const router = Router();

const generatePassword = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

router.post("/forget-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      return res
        .status(422)
        .json({ error: "Bunday foydalanuvchi mavjud emas!" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mirshodmurodov67@gmail.com",
        pass: "yyojxdfbgwwnwbgg",
      },
    });

    const a = generatePassword(999999, 100000);

    req.app.locals.password = a;

    const mailOptions = {
      from: "mirshodmurodov67@gmail.com",
      to: savedUser.email,
      subject: "Toplink Website",
      text: `Toplink uchun tasdiqlash kodi ${a}`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ msg: info, text: "Tasdiqlash kodi jo'natildi" });
      }
    });
  });
});

router.post("/verification-password", (req, res) => {
  const { verificationPassword } = req.body;

  if (!verificationPassword) {
    return res
      .status(422)
      .json({ error: "Iltimos hamma bo'sh joylarni kiriting!" });
  }

  if (+verificationPassword === +req.app.locals.password) {
    return res.json({ msg: "Kod tasdiqlandi" });
  } else {
    return res.json({
      error: "Parol xato terildi, yana bir bor urinib ko'ring",
    });
  }
});

router.post("/reset-password", auth, (req, res) => {
  const { password, confirmation } = req.body;
  if (+password === +confirmation) {
    bcrypt.hash(password, 10).then((hashedPassword) => {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { password: hashedPassword },
        { new: true }
      ).then(() => {
        return res.json({ msg: "Parol muvaffaqiyatli yangilandi!" });
      });
    });
  } else {
    return res
      .status(422)
      .json({ error: "Ikkala parol bir xil bo'lishi kerak!" });
  }
});

module.exports = router;
