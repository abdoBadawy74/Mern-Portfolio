const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    image: { type: String, required: true },
    link: { type: String },
    github: { type: String },
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
