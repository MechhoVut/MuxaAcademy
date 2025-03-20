import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/notification.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password, course } = req.body;

    // Check if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const mobileExists = await User.findOne({ mobile });
    if (mobileExists) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      mobile,
      password,
      course
    });

    await user.save();

    // Send registration email
    try {
      await sendEmail(
        email,
        'Welcome to Muxa Academy',
        `
        <h2>Welcome to Muxa Academy!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering with Muxa Academy. Your account has been successfully created.</p>
        <p><strong>Account Details:</strong></p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Course: ${course}</li>
        </ul>
        <p>You can now login to your account using your email/mobile and password.</p>
        <p>Best regards,<br>Muxa Academy Team</p>
        `
      );
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Continue with registration even if notifications fail
    }

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send login notification email
    try {
      await sendEmail(
        user.email,
        'New Login Detected - Muxa Academy',
        `
        <h2>New Login Alert</h2>
        <p>Dear ${user.name},</p>
        <p>A new login was detected on your Muxa Academy account.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p>If this wasn't you, please immediately and contact our support team.</p>
        <p>Best regards,<br>Muxa Academy Team</p>
        `
      );
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Continue with login even if notifications fail
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        course: user.course
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;