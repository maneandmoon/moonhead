import React, { useState } from 'react';
import './AppointmentCard.css';
import EditAppointmentForm from './EditAppointmentForm';
import formatTime from './formatTime';

function AppointmentCard({ 
  appointment, 
  users = [], 
  hairstyles = [], 
  stylists = [], 
  deleteAppointment, 
  updateAppointment 
}) {

  console.log(appointment); // Check what this outputs
  console.log('Received appointment:', appointment);

  const [isEditing, setIsEditing] = useState(false);
//   const [currentAppointment, setCurrentAppointment] = useState(appointment);
  const [currentAppointment, setCurrentAppointment] = useState(appointment || {});

  const toggleEditForm = () => setIsEditing(!isEditing);

  const handleUpdate = (updatedData) => {
    updateAppointment(updatedData).then((updatedAppointment) => {
      setCurrentAppointment(updatedAppointment); // Update the local state with the new data
      setIsEditing(false); // Close the editing form
    });
  };

  // Find names from the provided arrays
  console.log('Users:', users);
  console.log('Hairstyles:', hairstyles);
  console.log('Stylists:', stylists);
  console.log('Current Appointment:', currentAppointment);

//   const user = users.find(user => user.id === currentAppointment.user_id);
//   const hairstyle = hairstyles.find(style => style.id === currentAppointment.hairstyle_id);
//   const stylist = stylists.find(stylist => stylist.id === currentAppointment.stylist_id);

  const user = currentAppointment ? users.find(user => user.id === currentAppointment.user_id) : null;
  const hairstyle = currentAppointment ? hairstyles.find(style => style.id === currentAppointment.hairstyle_id) : null;
  const stylist = currentAppointment ? stylists.find(stylist => stylist.id === currentAppointment.stylist_id) : null;

 
//   console.log('Current Appointment:', currentAppointment);
  console.log('User:', user);
  console.log('Hairstyle:', hairstyle);
  console.log('Stylist:', stylist);

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
          <p>User: {user ? user.username : 'Unknown'}</p>
          <p>Hairstyle: {hairstyle ? hairstyle.name : 'Unknown'}</p>
          <p>Stylist: {stylist ? stylist.name : 'Unknown'}</p>
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
