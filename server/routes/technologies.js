const express = require('express');
const router = express.Router();
const Technology = require('../models/Technology');

// @route   GET /api/technologies
// @desc    Get all technologies
// @access  Public
router.get('/', async (req, res) => {
    try {
        const technologies = await Technology.find().sort({ createdAt: -1 });
        res.json(technologies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/technologies/:id
// @desc    Get single technology
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const technology = await Technology.findById(req.params.id);
        if (!technology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        res.json(technology);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/technologies
// @desc    Create a new technology
// @access  Private (Admin)
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.en || !name.ar) {
            return res.status(400).json({ message: 'Name in both English and Arabic is required' });
        }

        const technology = new Technology({ name });
        await technology.save();
        res.status(201).json(technology);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// @route   PUT /api/technologies/:id
// @desc    Update technology
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;

        const technology = await Technology.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );

        if (!technology) {
            return res.status(404).json({ message: 'Technology not found' });
        }

        res.json(technology);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// @route   DELETE /api/technologies/:id
// @desc    Delete technology
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const technology = await Technology.findByIdAndDelete(req.params.id);
        if (!technology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        res.json({ message: 'Technology deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
