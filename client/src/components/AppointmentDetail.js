import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatTime from './formatTime';
import { AppointmentContext } from './AppointmentContext';
import useAppointments from './useAppointments';


function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [user, setUser] = useState(null);
  const [hairstyle, setHairstyle] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { appointments, updateAppointment } = useContext(AppointmentContext);
  const { appointments, updateAppointment } = useAppointments();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/appointments/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch appointment");
        return res.json();
      })
      .then(appointmentData => {
        setAppointment(appointmentData);
        return Promise.all([
          fetch(`http://127.0.0.1:5555/users/${appointmentData.user_id}`),
          fetch(`http://127.0.0.1:5555/hairstyles/${appointmentData.hairstyle_id}`),
          fetch(`http://127.0.0.1:5555/stylists/${appointmentData.stylist_id}`)
        ]);
      })
      .then(responses => Promise.all(responses.map(res => {
        if (!res.ok) throw new Error("Failed to fetch related data");
        return res.json();
      })))
      .then(([userData, hairstyleData, stylistData]) => {
        setUser(userData);
        setHairstyle(hairstyleData);
        setStylist(stylistData);
        // console.log("User Data:", userData);
        // console.log("Hairstyle Data:", hairstyleData);
        // console.log("Stylist Data:", stylistData);
      })
      .catch(err => console.error("Unable to fetch appointment details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/appointments/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          alert("Appointment deleted successfully");
          navigate('/appointments'); // Redirect to appointments list
        } else {
          throw new Error("Failed to delete appointment");
        }
      })
      .catch(err => console.error(err));
  };

  const handleEdit = () => {
    navigate(`/appointments/edit/${id}`); // Navigate to edit page
  };

  if (loading) {
    return <div>Loading appointment...</div>;
  }

  if (!appointment) {
    return <div>No appointment found.</div>;
  }

  return (
    <div>
      <h2>Appointment Details</h2>
      <p>Appointment ID: {appointment.id}</p>
      <p>User: {user ? user.username : 'Unknown'}</p>
      <p>Hairstyle: {hairstyle ? hairstyle.name : 'Unknown'}</p>
      <p>Stylist: {stylist ? stylist.name : 'Unknown'}</p>
      <p>Date: {appointment.date}</p>
      <p>Time: {formatTime(appointment.time)}</p>

      <button onClick={handleEdit} style={{ marginRight: '10px' }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete
      </button>
    </div>
  );
}

export default AppointmentDetail;