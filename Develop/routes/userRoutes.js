// Initiate dependencies
const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single user by its _id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT to update a user by its _id
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});