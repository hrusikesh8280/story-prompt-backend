const mongoose = require('mongoose');

const savedStorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedStory = mongoose.model('SavedStory', savedStorySchema);

module.exports = SavedStory;
