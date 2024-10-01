import React from 'react';
import AppointmentCard from './AppointmentCard';

function AppointmentList({ appointments, deleteAppointment, updateAppointment, users, hairstyles, stylists }) {
  return (
    <ul>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          users={users}
          hairstyles={hairstyles}
          stylists={stylists}
          deleteAppointment={deleteAppointment}
          updateAppointment={updateAppointment}
          
        />
      ))      
      }
    </ul>
  );
}

export default AppointmentList;

