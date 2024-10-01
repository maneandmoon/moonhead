import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditAppointmentForm from './EditAppointmentForm';

function EditAppointmentPage({ updateAppointment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/appointments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch appointment');
        }
        return res.json();
      })
      .then((data) => setAppointment(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleUpdate = (updatedAppointment) => {
    updateAppointment(updatedAppointment);
    navigate('/appointments'); // Navigate back to appointments list after updating
  };

  const closeForm = () => {
    navigate('/appointments'); // Navigate back to appointments list
  };

  if (error) return <div>Error: {error}</div>;
  if (!appointment) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Appointment</h2>
      <EditAppointmentForm
        appointment={appointment}
        updateAppointment={handleUpdate}
        closeForm={closeForm}
      />
    </div>
  );
}

export default EditAppointmentPage;
