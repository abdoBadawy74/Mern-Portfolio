const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Technology', technologySchema);
