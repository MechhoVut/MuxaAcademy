import express from 'express';
import Application from '../models/Application.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create new application
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      country,
      education,
      school,
      percentage,
      yearOfPassing,
      courseId
    } = req.body;

    const application = new Application({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      country,
      education: {
        level: education,
        school,
        percentage,
        yearOfPassing
      },
      course: courseId,
      status: 'pending'
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications (admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('course', 'name')
      .sort({ date: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Update application status (admin only)
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status' });
  }
});

export default router;