const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'project-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin)
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        console.log('--- Debug Project Creation ---');
        console.log('Req Body:', req.body);
        console.log('Req Files:', req.files);
        console.log('Project Schema Keys:', Object.keys(Project.schema.paths));

        const { title, description, link, github, technologies, featured, videoUrl } = req.body;

        let images = [];
        if (req.files) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Parse JSON strings back to objects/arrays if they come as strings from FormData
        const parsedTitle = typeof title === 'string' ? JSON.parse(title) : title;
        const parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
        const parsedTechnologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;

        const project = new Project({
            title: parsedTitle,
            description: parsedDescription,
            images,
            videoUrl,
            link,
            github,
            technologies: parsedTechnologies,
            featured: featured === 'true' || featured === true
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Project Creation Error:', error);
        res.status(400).json({
            message: 'Bad request',
            error: error.message,
            receivedBody: req.body,
            schemaKeys: Object.keys(Project.schema.paths)
        });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const { title, description, link, github, technologies, featured, videoUrl, existingImages } = req.body;

        // Handle new images
        let newImages = [];
        if (req.files) {
            newImages = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Combine existing (kept) images with new ones
        // existingImages might come as a string or array depending on FormData
        let currentImages = [];
        if (existingImages) {
            currentImages = Array.isArray(existingImages) ? existingImages : [existingImages];
        }

        // If existingImages is a stringified JSON array
        if (typeof existingImages === 'string') {
            try {
                const parsed = JSON.parse(existingImages);
                if (Array.isArray(parsed)) currentImages = parsed;
                else currentImages = [existingImages];
            } catch (e) {
                // existingImages was just a plain string URL
                currentImages = [existingImages];
            }
        }

        const allImages = [...currentImages, ...newImages];

        const parsedTitle = typeof title === 'string' ? JSON.parse(title) : title;
        const parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
        const parsedTechnologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;


        const projectField = {
            title: parsedTitle,
            description: parsedDescription,
            images: allImages,
            videoUrl,
            link,
            github,
            technologies: parsedTechnologies,
            featured: featured === 'true' || featured === true
        };

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            projectField,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Ideally, delete associated files here too
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
