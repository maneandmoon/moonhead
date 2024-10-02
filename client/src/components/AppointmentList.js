import React, { useContext } from 'react';
import { AppointmentContext } from './AppointmentContext';
import AppointmentCard from './AppointmentCard';

function AppointmentList({ users, hairstyles, stylists }) {
  const { appointments } = useContext(AppointmentContext);

  return (
    <ul>
      {appointments.map(appointment => {
        const user = users.find(user => user.id === appointment.user_id) || { username: 'Unknown' };
        const hairstyle = hairstyles.find(style => style.id === appointment.hairstyle_id) || { name: 'Unknown' };
        const stylist = stylists.find(stylist => stylist.id === appointment.stylist_id) || { name: 'Unknown' };

        return (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            user={user.username} // Pass user here
            hairstyle={hairstyle.name} // Pass hairstyle here
            stylist={stylist.name} // Pass stylist here
          />
        );
      })}
    </ul>
  );
}

export default AppointmentList;
