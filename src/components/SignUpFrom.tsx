import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { calculatePasswordStrength } from '../utils/passwordStrength';

const SignUpForm = () => {
  const [passwordStrength, setPasswordStrength] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values: any) => {
    // Save email and password in localStorage
    localStorage.setItem('email', values.email);
    localStorage.setItem('password', values.password);

    // Optionally store email in localStorage if Remember Me is checked
    if (rememberMe) {
      localStorage.setItem('email', values.email);
    } else {
      localStorage.removeItem('email');
    }
    
    alert('Sign Up Successful');
    navigate('/login'); // Redirect to login page after sign-up
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleBlur }) => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field id="name" type="text" name="name" />
            <ErrorMessage name="name" component="div" />

            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handlePasswordChange(e);
              }}
            />
            <ErrorMessage name="password" component="div" />
            <div className="password-strength">Password Strength: {passwordStrength}</div>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field id="confirmPassword" type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />

            <div className="checkbox-container">
              <Field
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit">Sign Up</button>

            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => navigate('/login')}>Sign In</button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
