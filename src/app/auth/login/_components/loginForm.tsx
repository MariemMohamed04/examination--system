/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation'; 
import { useState } from 'react'; 
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik'; 
import FieldComponent from '@/components/ui/field-component'; 
import Loading from '@/components/common/loading-component'; 
import ButtonComponent from '@/components/ui/button-component'; 
import Link from 'next/link'; 

export default function LoginForm() {
  // Navigation
  const router = useRouter(); // Router instance to navigate to different pages

  // State Management
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const [loading, setLoading] = useState(false); // State to control loading spinner

  // Form Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address') // Validate email format
      .required('Email is required'), // Email is required
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters') // Password length should be at least 6 characters
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Password must contain at least one uppercase letter
      .matches(/\d/, 'Password must contain at least one number') // Password must contain at least one number
      .required('Password is required'), // Password is required
  });

  // Submit Handler Function
  const handleSubmit = async (values: any) => {
    setError(null); // Clear any previous errors
    setLoading(true); // Start loading while the request is being processed

    // Sign in using credentials (email and password) using NextAuth's signIn function
    const response = await signIn('credentials', {
      ...values, // Pass in email, password, and other form values
      redirect: false, // Prevent automatic redirection after sign-in
    });

    setLoading(false); // Stop loading after the response is received

    // If login is successful, redirect to the dashboard (or a custom URL if provided)
    if (response?.ok) {
      console.log('Success');
      router.push(response.url || '/dashboard'); // Redirect to the URL provided by the response or fallback to '/dashboard'
      return;
    }

    // If login fails, display the error message
    setError(response?.error || 'fallback-error-message');
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      {/* Formik Form to handle login */}
      <Formik
        initialValues={{ email: '', password: '', remember: false }} // Initial form values
        validationSchema={validationSchema} // Validation schema for form fields
        onSubmit={handleSubmit} // Handle form submission
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {/* Email Field */}
            <div className="mb-5">
              <FieldComponent
                name="email" // Name of the field
                type="email" // Input type is email
                placeholder="Email" // Placeholder for the input field
                className={`${
                  errors.email && touched.email ? 'input-error' : ''
                }`} // Add error class if validation fails
              />
              {/* Error Message for email */}
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <FieldComponent
                type="password" // Input type is password
                name="password" // Name of the field
                placeholder="Password" // Placeholder for the password field
                className={`${
                  errors.password && touched.password ? 'input-error' : ''
                }`} // Add error class if validation fails
              />
              {/* Error Message for password */}
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Link to the forgot password page */}
            <Link
              href={{
                pathname: '/auth/forgotPassword',
                query: {}, // Clear any query parameters from the URL
              }}
              className="block"
            >
              <p className="text-right mb-6">Recover Password?</p>
            </Link>

            {/* Submit Button */}
            {loading ? (
              <Loading /> // Show loading spinner while the request is being processed
            ) : (
              <ButtonComponent type="submit" text="Sign in" /> // Show submit button
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
