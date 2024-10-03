import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import EditAppointmentForm from './EditAppointmentForm';
import { AppointmentContext } from './AppointmentContext';
import formatTime from './formatTime';
import formatDate from './formatDate';

function AppointmentCard({ appointment, user, hairstyle, stylist }) {
  const { updateAppointment, deleteAppointment } = useContext(AppointmentContext);
//   const [isEditing, setIsEditing] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(appointment || {});

  const navigate = useNavigate(); 

//   const toggleEditForm = () => setIsEditing(!isEditing);

  const handleUpdate = (updatedData) => {
    updateAppointment(updatedData).then((updatedAppointment) => {
      if (updatedAppointment) {
        setCurrentAppointment(updatedAppointment);
      }
    //   setIsEditing(false);
    });
  };

  const handleEdit = () => {
    // Navigate to the edit appointment for this appointment
    navigate(`/appointments/edit/${appointment.id}`);
  };

  if (!appointment) {
    return <div>No appointment data available.</div>;
  }

  return (
    <li className="appointment-card">
      <h3>Appointment ID: {appointment.id}</h3>
      <p>User: {user ? user.username : 'Unknown'}</p>
      <p>Hairstyle: {hairstyle ? hairstyle.name : 'Unknown'}</p>
      <p>Price: {hairstyle ? `$${hairstyle.price}` : 'Unknown'}</p>
      <p>Stylist: {stylist ? stylist.name : 'Unknown'}</p>
      <p>Date: {formatDate(appointment.date)}</p>
      <p>Time: {formatTime(appointment.time)}</p>
      <button onClick={handleEdit}>Edit</button> <button onClick={() => deleteAppointment(appointment.id)}>Delete</button>
    </li>
  );
}

export default AppointmentCard;
