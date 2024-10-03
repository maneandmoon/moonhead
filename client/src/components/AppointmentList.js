import React from 'react';
import useAppointments from './useAppointments';
import AppointmentCard from './AppointmentCard';

function AppointmentList({ users, hairstyles, stylists }) {
  const { appointments } = useAppointments();

  return (
    <ul className="appointment-list">
      {appointments.map(appointment => {
        const user = users.find(user => user.id === appointment.user_id) || { username: 'Unknown' };
        const hairstyle = hairstyles.find(hairstyle => hairstyle.id === appointment.hairstyle_id) || { name: 'Unknown' };
        const stylist = stylists.find(stylist => stylist.id === appointment.stylist_id) || { name: 'Unknown' };

        return (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            user={user}
            hairstyle={hairstyle}
            stylist={stylist}
          />
        );
      })}
    </ul>
  );
}

export default AppointmentList;

