const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
  },
  searchComponent: {
    type: Array,
    required: true,
  },
  tableComponent: {
    type: Array,
    required: true,
  },
});

const templateCollection = mongoose.model("templates", templateSchema);

module.exports = templateCollection;
