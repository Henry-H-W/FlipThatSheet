const mongoose = require('mongoose');

const pdfDetailsSchema = new mongoose.Schema(
    {
    pdf: String,
    title: String,
    }, 
    {collection: "pdfDetails"}
);
 

module.exports = mongoose.model('pdfDetails', pdfDetailsSchema)