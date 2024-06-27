import React, { useState, useEffect } from 'react';
import './AppointmentScheduler.css';
import ScheduledConfirmation from './ScheduledConfirmation'; // Import the ScheduledConfirmation component

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    // Fetch existing appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments'); // Adjust the endpoint as needed
        const data = await response.json();

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleScheduleAppointment = async () => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const newAppointment = await response.json();

      if (newAppointment && newAppointment.date && newAppointment.time) {
        setAppointments([...appointments, newAppointment]);
        setConfirmationMessage('Appointment scheduled successfully!');
      } else {
        console.error('Failed to schedule appointment:', newAppointment);
      }
    } catch (error) {
      console.error('Error scheduling appointment', error);
    }
  };

  return (
    <div className="scheduler-container">
      <h2>Schedule Appointment</h2>
      <div className="scheduler-form">
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
        <label>Time:</label>
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        />
        <button onClick={handleScheduleAppointment}>Schedule</button>
      </div>
      {confirmationMessage && <ScheduledConfirmation message={confirmationMessage} />}

      <h3>Upcoming Appointments</h3>
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} at {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentScheduler;
