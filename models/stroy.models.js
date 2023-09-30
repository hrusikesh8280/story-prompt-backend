const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  upvotesCount: {
    type: Number,
    default: 0,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
