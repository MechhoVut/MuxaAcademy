import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import Course from '../models/Course.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

const router = express.Router();

// Dashboard Stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeCourses = await Course.countDocuments({ status: 'active' });
    const totalApplications = await Application.countDocuments();
    
    // Calculate revenue (example calculation)
    const revenue = await Application.aggregate([
      { $match: { status: 'approved' } },
      { $lookup: { from: 'courses', localField: 'course', foreignField: '_id', as: 'courseDetails' } },
      { $unwind: '$courseDetails' },
      { $group: { _id: null, total: { $sum: { $toInt: { $trim: { input: { $substr: ['$courseDetails.fees', 1, -1] } } } } } } }
    ]);

    res.json({
      totalStudents,
      activeCourses,
      totalApplications,
      revenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Course Management
router.post('/courses', adminAuth, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/courses', adminAuth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/courses/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/courses/:id', adminAuth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Application Management
router.get('/applications', adminAuth, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('course', 'name')
      .sort({ date: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/applications/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('course', 'name');
    
    // If application is approved, increment the course's student count
    if (status === 'approved') {
      await Course.findByIdAndUpdate(
        application.course._id,
        { $inc: { students: 1 } }
      );
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Management
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;