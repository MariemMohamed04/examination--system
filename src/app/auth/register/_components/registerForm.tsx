/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import FieldComponent from '@/components/ui/field-component';
import Loading from '@/components/common/loading-component';
import ButtonComponent from '@/components/ui/button-component'; 
import { registerAction } from '@/lib/actions/auth.action';

export default function RegisterForm() {
  // Navigation
  const router = useRouter(); // Using Next.js router for navigation

  // State for handling errors and loading state
  const [error, setError] = useState<string | null>(null); // State for storing any error messages
  const [loading, setLoading] = useState(false); // State for loading indication during submission

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long') // Validates username length
      .required('Username is required'), // Ensures username is provided
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters long') // Validates first name length
      .required('First name is required'), // Ensures first name is provided
    lastName: Yup.string()
      .min(3, 'Last name must be at least 3 characters long') // Validates last name length
      .required('Last name is required'), // Ensures last name is provided
    email: Yup.string()
      .email('Invalid email address') // Validates email format
      .required('Email is required'), // Ensures email is provided
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, // Validates password complexity
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
      )
      .required('Password is required'), // Ensures password is provided
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match') // Ensures password and confirm password match
      .required('Confirm password is required'), // Ensures confirm password is provided
    phone: Yup.string()
      .typeError('Phone number must be a valid number') // Ensures phone number is valid
      .matches(
        /^01[0125][0-9]{8}$/, // Validates phone number format (starting with '01' and followed by valid digits)
        'Phone number must start with 01 followed by 0, 1, 2, or 5 and contain 11 digits in total'
      )
      .required('Phone number is required'), // Ensures phone number is provided
  });

  // Submit handler
  const handleSubmit = async (values: any) => {
    setError(null); // Reset any previous errors
    setLoading(true); // Set loading state to true to show loading indicator

    try {
      // Destructuring values from the form submission
      const {
        username,
        firstName,
        lastName,
        email,
        password,
        rePassword,
        phone,
      } = values;
      
      // Sending registration data to the backend
      const response = await registerAction(values);
      console.log('Response:', response); // Logging the response for debugging

      // Redirecting to the dashboard upon successful registration
      router.push('/dashboard');
    } catch (err: any) {
      // Handling any errors during the registration process
      setError(err.message); // Set error message in state
      console.error(err); // Log error for debugging
    } finally {
      // Reset loading state once the process is complete
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      {/* Formik form with validation and submission handler */}
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          rePassword: '',
          phone: '',
        }}
        validationSchema={validationSchema} // Applying the validation schema
        onSubmit={handleSubmit} // Passing the submit handler
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {/* Username Input Field */}
            <div className="mb-5">
              <FieldComponent
                name="username"
                type="text"
                placeholder="Username"
                className={`${
                  errors.username && touched.username ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* First Name Input Field */}
            <div className="mb-5">
              <FieldComponent
                name="firstName"
                type="text"
                placeholder="First Name"
                className={`${
                  errors.firstName && touched.firstName ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Last Name Input Field */}
            <div className="mb-5">
              <FieldComponent
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={`${
                  errors.lastName && touched.lastName ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email Input Field */}
            <div className="mb-5">
              <FieldComponent
                name="email"
                type="email"
                placeholder="Email"
                className={`${
                  errors.email && touched.email ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Input Field */}
            <div className="mb-5">
              <FieldComponent
                type="password"
                name="password"
                placeholder="Password"
                className={`${
                  errors.password && touched.password ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password Input Field */}
            <div className="mb-5">
              <FieldComponent
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                className={`${
                  errors.rePassword && touched.rePassword ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone Input Field */}
            <div className="mb-5">
              <FieldComponent
                name="tel"
                type="text"
                placeholder="Phone"
                className={`${
                  errors.phone && touched.phone ? 'input-error' : ''
                }`}
              />
              <ErrorMessage
                name="tel"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            {loading ? (
              <Loading /> // Show the loading component while loading state is true
            ) : (
              <ButtonComponent type="submit" text="Sign up" /> // Show submit button when not loading
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
