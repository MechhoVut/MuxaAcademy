import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Get all active courses (public route)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ status: 'active' });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;