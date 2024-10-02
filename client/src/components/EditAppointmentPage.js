import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditAppointmentForm from './EditAppointmentForm';
import useAppointments from './useAppointments';

function EditAppointmentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { appointments, updateAppointment } = useAppointments();
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const appointmentToEdit = appointments.find(app => app.id === Number(id));
        if (appointmentToEdit) {
            setAppointment(appointmentToEdit);
        } else {
            setError("Appointment not found.");
        }
    }, [appointments, id]);

    const handleUpdate = (updatedAppointment) => {
        updateAppointment(updatedAppointment);
        navigate('/appointments');
    };

    const closeForm = () => {
        navigate('/appointments'); 
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