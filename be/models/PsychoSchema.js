const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PsychoSchema = new Schema({
  sub: {
    type: String,
    unique: true,
  },
  picture: String,
  name: String,
  email: String,
  oradij: Number,
  clients: [],
  access_token: String,
  refresh_token: String,
});


module.exports = mongoose.model("Psychologist", PsychoSchema)