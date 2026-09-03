const express = require('express');
const router = express.Router();
const notes = require('../models/Note');
const mongoose = require('mongoose');

// CREATE - POST /notes
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newNote = new notes({ title, content });
  newNote.save();
  res.status(201).json(newNote);
});

// READ ALL - GET /notes
router.get('/', (req, res) => {
  notes.find({}, (err, notes) => {
    if (err) return res.status(500).json({ error: err });
    res.json(notes);
  });
});

// READ ONE - GET /notes/:id
router.get('/:id', (req, res) => {
  notes.findById(req.params.id, (err, note) => {
    if (err) return res.status(500).json({ error: err });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  });
});

// UPDATE - PUT /notes/:id
router.put('/:id', (req, res) => {
    notes.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, note) => {
        if (err) return res.status(500).json({ error: err });
        if (!note) return res.status(404).json({ error: 'Note not found' });


        res.json(note);
    });

    // DELETE - DELETE /notes/:id
    router.delete('/:id', (req, res) => {
        notes.findByIdAndRemove(req.params.id, (err, note) => {
            if (err) return res.status(500).json({ error: err });
            if (!note) return res.status(404).json({ error: 'Note not found' });
            res.json(note);
        });
    });

    module.exports = router
});
