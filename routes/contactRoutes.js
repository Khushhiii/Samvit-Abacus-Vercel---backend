const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

const contactValidators = [
  body('student_name').trim().notEmpty().withMessage('Student name is required'),
  body('parent_name').trim().notEmpty().withMessage('Parent name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('course_interested').trim().notEmpty().withMessage('Course is required'),
  body('student_age').isInt({ min: 3 }).withMessage('Student age must be a number'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

const registrationValidators = [
  body('student_name').trim().notEmpty().withMessage('Student name is required'),
  body('parent_name').trim().notEmpty().withMessage('Parent name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('course_level').trim().notEmpty().withMessage('Course level is required'),
  body('student_age').isInt({ min: 3 }).withMessage('Student age must be a number'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('previous_experience').optional().trim(),
];

router.post('/contact', contactValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const {
    student_name,
    parent_name,
    email,
    phone,
    course_interested,
    student_age,
    message,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO contacts (student_name, parent_name, email, phone, course_interested, student_age, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_name, parent_name, email, phone, course_interested, student_age, message],
    );

    return res.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error saving contact', error);
    return res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
  }
});

router.post('/contact/register', registrationValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const {
    student_name,
    parent_name,
    email,
    phone,
    course_level,
    student_age,
    address,
    previous_experience = null,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO registrations (student_name, parent_name, email, phone, course_level, student_age, address, previous_experience)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [student_name, parent_name, email, phone, course_level, student_age, address, previous_experience],
    );

    return res.json({ success: true, message: 'Registration submitted successfully' });
  } catch (error) {
    console.error('Error saving registration', error);
    return res.status(500).json({ success: false, message: 'Failed to submit registration' });
  }
});

module.exports = router;
