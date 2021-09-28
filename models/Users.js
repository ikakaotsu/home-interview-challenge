const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = mongoose.model(
  "User",
  new Schema({
    fullname: String,
    email: String,
    username: String,
    password: String,
    country: String,
    custom_country: String,
    salt: String,
  })
);

module.exports = Users;
