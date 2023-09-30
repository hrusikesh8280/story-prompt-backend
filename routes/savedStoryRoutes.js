const express = require('express');
const router = express.Router();

const SavedStory = require('../models/savedStory.models');
const verifyToken = require('../middleware/verifyToken');

// API endpoint to save a story
router.post('/save/:storyId', verifyToken, async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.userId;
    const existingSavedStory = await SavedStory.findOne({ userId, storyId });

    if (existingSavedStory) {
      return res.status(400).json({ message: 'Story is already saved.' });
    }
    const savedStory = new SavedStory({ userId, storyId });
    await savedStory.save();

    res.status(201).json({ message: 'Story saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// API endpoint to retrieve saved stories for a user
router.get('/saved-stories', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const savedStories = await SavedStory.find({ userId }).populate('storyId');

    res.status(200).json(savedStories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// API endpoint to remove a saved story
router.delete('/remove/:savedStoryId', verifyToken, async (req, res) => {
  try {
    const { savedStoryId } = req.params;
    const userId = req.userId;
    const savedStory = await SavedStory.deleteOne({ _id: savedStoryId, userId });

    if (res.deletedCount === 0) {
      return res.status(404).json({ message: 'Saved story not found.' });
    }
    res.status(200).json({ message: 'Story removed from saved list.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
module.exports = router;
