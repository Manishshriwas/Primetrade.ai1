import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all notes for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Getting notes for user:', userId);
    
    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    res.status(200).json({ 
      message: "Notes retrieved successfully", 
      notes,
      count: notes.length 
    });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(400).json({ message: error.message });
  }
});

// Create a new note
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, priority } = req.body;
    const userId = req.user._id;
    
    console.log('Creating note:', { title, userId, priority });
    
    if (!title || !content) {
      return res.status(400).json({ 
        message: "Title and content are required" 
      });
    }

    const note = new Note({
      title,
      content,
      userId,
      tags: tags || [],
      priority: priority || 'medium'
    });

    await note.save();
    
    // Populate user info for response
    await note.populate('userId', 'name email');
    
    res.status(201).json({ 
      message: "Note created successfully", 
      note 
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a note
router.put('/:noteId', authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, priority, isCompleted } = req.body;
    const userId = req.user._id;
    
    console.log('Updating note:', noteId, 'for user:', userId);
    
    // Find note and verify ownership
    const note = await Note.findOne({ _id: noteId, userId });
    
    if (!note) {
      return res.status(404).json({ 
        message: "Note not found or you don't have permission to edit it" 
      });
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (priority !== undefined) note.priority = priority;
    if (isCompleted !== undefined) note.isCompleted = isCompleted;

    await note.save();
    await note.populate('userId', 'name email');
    
    res.status(200).json({ 
      message: "Note updated successfully", 
      note 
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:noteId', authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;
    
    console.log('Deleting note:', noteId, 'for user:', userId);
    
    // Find and delete note, verify ownership
    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    
    if (!note) {
      return res.status(404).json({ 
        message: "Note not found or you don't have permission to delete it" 
      });
    }
    
    res.status(200).json({ 
      message: "Note deleted successfully" 
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(400).json({ message: error.message });
  }
});

// Toggle note completion status
router.patch('/:noteId/toggle', authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;
    
    console.log('Toggling note completion:', noteId);
    
    const note = await Note.findOne({ _id: noteId, userId });
    
    if (!note) {
      return res.status(404).json({ 
        message: "Note not found or you don't have permission to edit it" 
      });
    }

    note.isCompleted = !note.isCompleted;
    await note.save();
    await note.populate('userId', 'name email');
    
    res.status(200).json({ 
      message: "Note status updated successfully", 
      note 
    });
  } catch (error) {
    console.error('Error toggling note:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;