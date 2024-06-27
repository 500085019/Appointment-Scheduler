const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Create an appointment
router.post('/', auth, async (req, res) => {
  try {
    const { date, time, description } = req.body;
    const newAppointment = new Appointment({
      userId: req.user.userId,
      date,
      time,
      description,
    });
    const appointment = await newAppointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all appointments for a user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId });
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update an appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, time, description } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    if (appointment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.description = description || appointment.description;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete an appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    if (appointment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await appointment.remove();
    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
