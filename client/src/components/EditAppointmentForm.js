import React from 'react';
import formatTime from "./formatTime";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AppointmentContext } from './AppointmentContext';

function EditAppointmentForm({ appointment, closeForm }) {
  const { updateAppointment, updateLoading, errorMessage } = useContext(AppointmentContext);
  
  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
  });

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

  // Format initial values to prevent undefined issues
  const initialValues = {
    date: appointment.date || '', // Ensure it's not undefined
    time: appointment.time || '', // Ensure it's not undefined
  };
  console.log('Initial Values:', initialValues);

  return (
    <Formik
      initialValues={initialValues}
      
      // {{
      //   // date: appointment.date || '', // Ensure it's not undefined
      //   // time: appointment.time || '', // Ensure it's not undefined
      //   // date: appointment.date,
      //   // time: appointment.time,
      // }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const updatedAppointment = { ...appointment, ...values };
        updateAppointment(updatedAppointment);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h3>Edit Appointment</h3>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
                <option key={timeOption} value={timeOption}>{formatTime(timeOption)}</option>
              ))}
            </Field>
            <ErrorMessage name="time" component="div" style={{ color: 'red' }} />
          </div>
          <br />
          <button type="submit" disabled={isSubmitting || updateLoading}>
          {updateLoading ? 'Updating...' : 'Save'}
          </button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditAppointmentForm;
