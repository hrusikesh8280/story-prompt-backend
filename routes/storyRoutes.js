const express = require('express');
const router = express.Router();

const axios = require('axios');
const Story = require('../models/stroy.models');
const verifyToken = require('../middleware/verifyToken');
require('dotenv').config();

// API endpoint to submit a story prompt
router.post('/submit-prompt', verifyToken, async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;
    const apiKey = process.env.OPENAI_API_KEY; 
    const aiPrompt = `Generate a short story based on the following prompt:\n${prompt}`;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [{ role: 'user', content: aiPrompt }],
        model: 'gpt-3.5-turbo',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const storyContent = response.data.choices[0].message.content;
    const story = new Story({ prompt, content: storyContent, userId });
    await story.save();
    res.status(201).json({ message: 'Story prompt submitted successfully.',storyContent,userId: req.userId,storyId: story._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// API endpoint to upvote a story
router.put('/upvote/:storyId', verifyToken, async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.userId; 
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found.' });
    }
    if (!story.upvotes) {
      story.upvotes = []; 
    }
    if (story.upvotes.includes(userId)) {
      return res.status(400).json({ message: "You've already upvoted this story." });
    }
    story.upvotes.push(userId);
    story.upvotesCount += 1;
    await story.save();
    res.status(200).json({ message: 'Story upvoted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// API endpoint to fetch the leaderboard of top-voted stories
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Story.find().sort({ upvotes: -1 }).limit(10);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
