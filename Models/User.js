const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = model("User", userSchema);
