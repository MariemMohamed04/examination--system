/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { forgotPasswordAction } from '@/lib/actions/auth.action';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import FieldComponent from '@/components/ui/field-component';
import Loading from '@/components/common/loading-component';
import ButtonComponent from '@/components/ui/button-component';
import HeadingComponent from '@/components/ui/header-component';
import VerifyCode from './verifyCodeForm';

const ForgotPasswordForm = () => {
  // State variables for error handling, loading state, and form control
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(true);
  const [isVerifyCodeOpen, setVerifyCodeOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Validation schema for the form using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address') // Ensures a valid email format
      .required('Email is required'), // Email field cannot be empty
  });

  // Handles form submission
  const handleSubmit = async (values: any) => {
    setForgotPasswordOpen(true);
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const { email } = values; // Extract email from form values
      setEmail(email); // Store email for verification
      const response = await forgotPasswordAction(email); // Call the forgot password API
      console.log('Response:', response); // Log API response (for debugging)
      setForgotPasswordOpen(false); // Close the "Forgot Password" form
      setVerifyCodeOpen(true); // Open the "Verify Code" form
    } catch (err: any) {
      setError(err.message); // Display error message
      console.error(err); // Log the error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Render the Forgot Password form */}
      {isForgotPasswordOpen && (
        <>
          <HeadingComponent text="Forgot Password" className="mb-6" />
          <div className="flex flex-col gap-8 justify-center items-center h-full">
            <Formik
              initialValues={{ email: '', password: '', remember: false }} // Default form values
              validationSchema={validationSchema} // Attach validation schema
              onSubmit={handleSubmit} // Submit handler
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Email input field */}
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
                  {/* Loading spinner or submit button */}
                  {loading ? (
                    <Loading />
                  ) : (
                    <ButtonComponent type="submit" text="Send Code" />
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
      {/* Render the Verify Code form */}
      {isVerifyCodeOpen && (
        <VerifyCode isFormOpen={isVerifyCodeOpen} email={email} />
      )}
    </>
  );
};

export default ForgotPasswordForm;
