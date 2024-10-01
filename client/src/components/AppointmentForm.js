import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import formatTime from "./formatTime";

function AppointmentForm({ addAppointment, users, hairstyles, stylists }) {
  const navigate = useNavigate();

  const AppointmentSchema = yup.object().shape({
    date: yup
      .date()
      .required("Date is required")
      .min(new Date(), "Date must be today or in the future"),
    time: yup
      .string()
      .required("Time is required")
      .matches(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
    user_id: yup.number().required("User ID is required"),
    hairstyle_id: yup.number().required("Hairstyle ID is required"),
    stylist_id: yup.number().required("Stylist ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      user_id: "",
      hairstyle_id: "",
      stylist_id: "",
    },
    validationSchema: AppointmentSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      fetch("http://127.0.0.1:5555/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          setSubmitting(false);
          if (response.ok) {
            return response.json();
          } else {
            response.json().then((err) => {
              setErrors({ api: err.errors });
              throw new Error("Failed to book appointment");
            });
          }
        })
        .then((appointment) => {
          addAppointment(appointment);
          alert("Appointment booked successfully!");
          navigate("/appointments");
        })
        .catch((error) => {
          setSubmitting(false);
          setErrors({ api: [error.message] });
        });
    },
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

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date && (
            <div style={{ color: "red" }}>{formik.errors.date}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="time">Time</label>
          <select
            id="time"
            name="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          >
            <option value="">Select a time</option>
            {getTimeOptions().map((timeOption) => (
              <option key={timeOption} value={timeOption}>{formatTime(timeOption)} </option>
            ))}
          </select>
          {formik.errors.time && formik.touched.time && (
            <div style={{ color: "red" }}>{formik.errors.time}</div>
          )}
        </div>

        {/* <div>
          <label htmlFor="user_id">User ID</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            onChange={formik.handleChange}
            value={formik.values.user_id}
          />
          {formik.errors.user_id && formik.touched.user_id && (
            <div style={{ color: "red" }}>{formik.errors.user_id}</div>
          )}
        </div> */}

        <div>
          <label htmlFor="user_id">User</label>
          <select
            id="user_id"
            name="user_id"
            onChange={formik.handleChange}
            value={formik.values.user_id}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          {formik.errors.user_id && formik.touched.user_id && (
            <div style={{ color: "red" }}>{formik.errors.user_id}</div>
          )}
        </div>

        {/* <div>
          <label htmlFor="hairstyle_id">Hairstyle ID</label>
          <input
            type="number"
            id="hairstyle_id"
            name="hairstyle_id"
            onChange={formik.handleChange}
            value={formik.values.hairstyle_id}
          />
          {formik.errors.hairstyle_id && formik.touched.hairstyle_id && (
            <div style={{ color: "red" }}>{formik.errors.hairstyle_id}</div>
          )}
        </div> */}

        <div>
          <label htmlFor="hairstyle_id">Hairstyle</label>
          <select
            id="hairstyle_id"
            name="hairstyle_id"
            onChange={formik.handleChange}
            value={formik.values.hairstyle_id}
          >
            <option value="">Select Hairstyle</option>
            {hairstyles.map((hairstyle) => (
              <option key={hairstyle.id} value={hairstyle.id}>{hairstyle.name}</option>
            ))}
          </select>
          {formik.errors.hairstyle_id && formik.touched.hairstyle_id && (
            <div style={{ color: "red" }}>{formik.errors.hairstyle_id}</div>
          )}
        </div>

        {/* <div>
          <label htmlFor="stylist_id">Stylist ID</label>
          <input
            type="number"
            id="stylist_id"
            name="stylist_id"
            onChange={formik.handleChange}
            value={formik.values.stylist_id}
          />
          {formik.errors.stylist_id && formik.touched.stylist_id && (
            <div style={{ color: "red" }}>{formik.errors.stylist_id}</div>
          )}
        </div> */}

        <div>
          <label htmlFor="stylist_id">Stylist</label>
          <select
            id="stylist_id"
            name="stylist_id"
            onChange={formik.handleChange}
            value={formik.values.stylist_id}
          >
            <option value="">Select Stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
            ))}
          </select>
          {formik.errors.stylist_id && formik.touched.stylist_id && (
            <div style={{ color: "red" }}>{formik.errors.stylist_id}</div>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Booking..." : "Book Appointment"}
        </button>

        {formik.errors.api && (
          <div style={{ color: "red" }}>
            {formik.errors.api.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default AppointmentForm;

