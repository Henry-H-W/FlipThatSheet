const mongoose = require('mongoose');

const pdfDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    pdf: {
        type: String,
    },
}, {collection: "pdfDetails"});

mongoose.model('pdfDetails', pdfDetailsSchema)