const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all contact messages
// @access  Private (Admin)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/contacts
// @desc    Create new contact message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// @route   PATCH /api/contacts/:id/read
// @desc    Mark contact as read
// @access  Private (Admin)
router.patch('/:id/read', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact message
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
