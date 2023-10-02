const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  templateName: String,
  searchComponent: Array,
  tableComponent: Array,
  tableStyle: Object,
});

const templateCollection = mongoose.model("templates", templateSchema);

module.exports = templateCollection;
