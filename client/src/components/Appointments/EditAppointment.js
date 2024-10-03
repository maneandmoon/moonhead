import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAppointments from '../useAppointments';
import formatTime from '../formatTime';

const EditAppointment = () => {
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
        setError('Appointment not found.');
      }
    }, [appointments, id]);
  
    const validationSchema = Yup.object({
      date: Yup.string().required('Date is required'),
      time: Yup.string().required('Time is required'),
    });
  
    if (error) return <div>Error: {error}</div>;
    if (!appointment) return <div>Loading...</div>;
  
    const initialValues = {
      date: appointment.date || '',
      time: appointment.time || '',
    };

    const closeForm = () => {
        navigate('/appointments');
      };

    // Generate time options in 15-minute increments
    const getTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
        for (let minute of [0, 15, 30, 45]) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            options.push(time);
        }
        }
        return options;
    };
  
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2>Edit Appointment</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const updatedAppointment = { ...appointment, ...values };
            try {
              await updateAppointment(updatedAppointment); // Wait for the update
              alert("Appointment updated successfully!");
              navigate('/appointments'); // Navigate after update
            } catch (error) {
              alert("Failed to update appointment. Please try again.");
            } finally {
              setSubmitting(false); // Always stop the loading state
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>Date:</label>
                <Field type="date" name="date" />
                <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
              </div>
              <br />
              
              <div>
                <label>Time:</label>
                <Field as="select" name="time">
                  <option value="">Select a time</option>
                  {getTimeOptions().map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {formatTime(timeOption)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="time" component="div" style={{ color: 'red' }} />
              </div>
              <br />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Save'}</button>
              <button type="button" onClick={closeForm} style={{ marginLeft: '10px' }}>
                Cancel
              </button>
              
            </Form>
          )}
        </Formik>
      </div>
    );
  }

export default EditAppointment;
