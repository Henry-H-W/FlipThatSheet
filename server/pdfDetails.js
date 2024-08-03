const mongoose = require("mongoose");

const pdfDetailsSchema = new mongoose.Schema(
  {
    pdf: Buffer,
    title: String,
  },
  { collection: "pdfDetails" }
);

module.exports = mongoose.model("pdfDetails", pdfDetailsSchema);
