const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/comments')

router.get('/', async (req, res) => {
      const comments = await Comment.find()
                                .populate("owner", "_id firstName lastName profilePhotoUrl")
                                .sort({ createdAt: -1 });
      return res.json(comments);
    });
    
router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const newComment = new Comment({
      owner: req.body.owner,
      event: req.body.event,
      body: req.body.body
    });

    let comment = await newComment.save();

    comment = await Comment.findById(comment._id)
      .populate('owner', '_id firstName lastName profilePhotoUrl')
      .populate('event', '_id eventName locationName dateTime difficulty eventType maxGroupSize longitude latitude');

    return res.json(comment);
  } catch (err) {
    next(err);
  }
}); 
    
router.patch('/:id', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const updatedCommentData = {
      body: req.body.body
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updatedCommentData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('owner', '_id firstName lastName profilePhotoUrl')
      .populate('event', '_id eventName locationName dateTime difficulty eventType maxGroupSize longitude latitude');

    if (!updatedComment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    return res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});

    
router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    return res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
});
    

module.exports = router;