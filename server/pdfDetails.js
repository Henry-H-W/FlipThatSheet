const mongoose = require('mongoose');

const pdfschema = new mongoose.Schema(
    {
    pdf: String,
    title: String,
    }, 
    { collection: "pdfDetails" });

mongoose.model("pdfDetails", pdfschema);