import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Password confirmation is required"),
  birthdate: yup.date().required("Birthdate is required"),
});

function SignupForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      birthdate: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);

      console.log(JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        birthdate: values.birthdate,
      }));

      fetch("http://localhost:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          birthdate: values.birthdate,
        }),
      })
      .then((response) => {
        setSubmitting(false);
        return response.text().then(text => {
          console.log('Response:', text); // Log raw response
          return { response, text }; // Return both the response and text
        });
      })
      .then(({ response, text }) => {
        if (response.ok) {
          const user = JSON.parse(text); // Parse if response is ok
          onLogin(user);
        } else {
          const err = JSON.parse(text); // Parse error response
          setErrors({ api: err.errors || ["An unexpected error occurred."] });
        }
      })
      .catch(error => {
        setSubmitting(false);
        console.error('Fetch error:', error);
        setErrors({ api: ['An unexpected error occurred.'] });
      });
    },
  });

  return (
    <div style={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>    
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.username}
              disabled={formik.isSubmitting} // Disable input during submission
              style={{ width: "100%", padding: "8px", margin: "8px 0" }}
            />
          </label>
          {formik.errors.username && formik.touched.username && (
            <div style={{ color: "red" }}>{formik.errors.username}</div>
          )}
        </div>

        <div>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled={formik.isSubmitting} // Disable input during submission
              style={{ width: "100%", padding: "8px", margin: "8px 0" }}
            />
          </label>
          {formik.errors.email && formik.touched.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>    

        <div>
          <label> 
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              disabled={formik.isSubmitting} // Disable input during submission
              style={{ width: "100%", padding: "8px", margin: "8px 0" }}
            />
          </label> 
          {formik.errors.password && formik.touched.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
        </div>

        <div>
          <label> 
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirmation}
              disabled={formik.isSubmitting} // Disable input during submission
              style={{ width: "100%", padding: "8px", margin: "8px 0" }}
            />
          </label> 
          {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && (
            <div style={{ color: "red" }}>{formik.errors.passwordConfirmation}</div>
          )}
        </div>

        <div>
            <label>
                <input
                type="date"
                name="birthdate"
                onChange={formik.handleChange}
                value={formik.values.birthdate}
                style={{ width: "100%", padding: "8px", margin: "8px 0" }}
                />
            </label>
            {formik.errors.birthdate && formik.touched.birthdate && (
                <div style={{ color: "red" }}>{formik.errors.birthdate}</div>
            )}
            </div>

        <button type="submit" disabled={formik.isSubmitting} style={{ padding: "10px", backgroundColor: "#D1782E", color: "white", border: "none", cursor: "pointer" }}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
        </button>

        {formik.errors.api && formik.errors.api.map((err, index) => (
          <div key={index} style={{ color: "red" }}>{err}</div>
        ))}
      </form>
    </div>
  );
}

export default SignupForm;