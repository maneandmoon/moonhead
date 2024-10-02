import React, { useState, useContext } from 'react'; 
import './AppointmentCard.css';
import EditAppointmentForm from './EditAppointmentForm';
import formatTime from './formatTime';
import { AppointmentContext } from './AppointmentContext';
import useAppointments from './useAppointments';

function AppointmentCard({ appointment }) {
  const { updateAppointment, deleteAppointment } = useContext(AppointmentContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(appointment || {});

  const toggleEditForm = () => setIsEditing(!isEditing);

  const handleUpdate = (updatedData) => {
    updateAppointment(updatedData).then((updatedAppointment) => {
      if (updatedAppointment) {
        setCurrentAppointment(updatedAppointment);
      }
      setIsEditing(false);
    });
  };

  if (!appointment) {
    return <div>No appointment data available.</div>;
  }

  // Ensure users, hairstyles, and stylists are defined before using them
  const users = appointment.users || [];
  const hairstyles = appointment.hairstyles || [];
  const stylists = appointment.stylists || [];

  const user = users.find(user => user.id === currentAppointment.user_id) || { username: 'Unknown' };
  const hairstyle = hairstyles.find(style => style.id === currentAppointment.hairstyle_id) || { name: 'Unknown' };
  const stylist = stylists.find(stylist => stylist.id === currentAppointment.stylist_id) || { name: 'Unknown' };

  return (
    <li className="appointment-card">
      {isEditing ? (
        <EditAppointmentForm
          appointment={currentAppointment}
          updateAppointment={handleUpdate}
          closeForm={toggleEditForm}
        />
      ) : (
        <>
          <h3>Appointment ID: {currentAppointment.id}</h3>
          <p>User: {user.username}</p>
          <p>Hairstyle: {hairstyle.name}</p>
          <p>Stylist: {stylist.name}</p>
          <p>Date: {currentAppointment.date}</p>
          <p>Time: {currentAppointment.time ? formatTime(currentAppointment.time) : 'Unknown'}</p>
          <button onClick={toggleEditForm}>Edit</button>
          <button onClick={() => deleteAppointment(currentAppointment.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default AppointmentCard;
