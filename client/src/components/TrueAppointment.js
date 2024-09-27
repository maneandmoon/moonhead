import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { 
  FormContainer, 
  StyledForm, 
  StyledInput, 
  StyledButton, 
  ErrorMessage, 
  FormTitle 
} from './styles';


function Appointment() {

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
            alert("Appointment booked successfully!");
            navigate("/appointments"); // Change to redirect as needed
          } else {
            response.json().then((err) => {
              setErrors({ api: err.errors });
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setErrors({ api: [error.message] });
        });
    },
  });

  return (
    <FormContainer>
        <FormTitle>Book an Appointment</FormTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
            <div>
            <label htmlFor="date">Date</label>
            <StyledInput
            type="date"
            id="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date && (
            <ErrorMessage>{formik.errors.date}</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <StyledInput
            type="time"
            id="time"
            name="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
          {formik.errors.time && formik.touched.time && (
            <ErrorMessage>{formik.errors.time}</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="user_id">User ID</label>
          <StyledInput
            type="number"
            id="user_id"
            name="user_id"
            onChange={formik.handleChange}
            value={formik.values.user_id}
          />
          {formik.errors.user_id && formik.touched.user_id && (
            <ErrorMessage>{formik.errors.user_id}</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="hairstyle_id">Hairstyle ID</label>
          <StyledInput
            type="number"
            id="hairstyle_id"
            name="hairstyle_id"
            onChange={formik.handleChange}
            value={formik.values.hairstyle_id}
          />
          {formik.errors.hairstyle_id && formik.touched.hairstyle_id && (
            <ErrorMessage>{formik.errors.hairstyle_id}</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="stylist_id">Stylist ID</label>
          <StyledInput
            type="number"
            id="stylist_id"
            name="stylist_id"
            onChange={formik.handleChange}
            value={formik.values.stylist_id}
          />
          {formik.errors.stylist_id && formik.touched.stylist_id && (
            <ErrorMessage>{formik.errors.stylist_id}</ErrorMessage>
          )}
        </div>

        <StyledButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Booking..." : "Book Appointment"}
        </StyledButton>

        {formik.errors.api && (
          <ErrorMessage>
            {formik.errors.api.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </ErrorMessage>
        )}
      </StyledForm>
    </FormContainer>
  );
}

export default Appointment;

