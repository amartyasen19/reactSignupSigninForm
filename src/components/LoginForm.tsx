import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setRememberMe(true);
    }
  }, []);

  const initialValues = {
    email: rememberMe ? localStorage.getItem('email') || '' : '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values: any) => {
    // Get stored credentials
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Validate the entered credentials
    if (values.email === storedEmail && values.password === storedPassword) {
      alert('Login Successful');
      navigate('/dashboard'); // Redirect to a dashboard or home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit">Login</button>

            <p>
              Don't have an account?{' '}
              <button type="button" onClick={() => navigate('/')}>Sign Up</button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
