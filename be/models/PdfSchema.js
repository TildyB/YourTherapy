const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    name: String,
    path: String,
});

module.exports = mongoose.model("Pdf", pdfSchema)