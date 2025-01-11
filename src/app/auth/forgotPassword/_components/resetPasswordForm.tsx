/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import FieldComponent from '@/components/ui/field-component';
import Loading from '@/components/common/loading-component';
import ButtonComponent from '@/components/ui/button-component';
import HeadingComponent from '@/components/ui/header-component';
import { resetPasswordAction } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';

type ResetPasswordProps = {
  isFormOpen: boolean; // To control whether the form is open or not
};

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ isFormOpen }) => {
  const router = useRouter();
  
  // State variables for error handling, loading state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validation schema for the reset password form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address') // Ensure the email is in a valid format
      .required('Email is required'), // Email is a required field
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters') // Ensure password has a minimum length
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Password must contain at least one uppercase letter
      .matches(/\d/, 'Password must contain at least one number') // Password must contain at least one number
      .required('Password is required'), // New password is required
    rePassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match') // Ensure both passwords match
      .required('Confirm password is required'), // Re-entered password is required
  });

  // Handles form submission
  const handleSubmit = async (values: any) => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state to true while making the request

    try {
      const { email, newPassword } = values; // Extract email and newPassword from form values
      const response = await resetPasswordAction(email, newPassword); // Call the action to reset the password
      console.log('Response:', response); // Log the response (for debugging)
      router.push('/auth/login'); // Redirect user to login page after successful password reset
    } catch (err: any) {
      setError(err.message); // Set any error that occurs during the process
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Reset loading state after the operation is complete
    }
  };

  return (
    <>
      {/* Only show the form if isFormOpen is true */}
      {isFormOpen && (
        <>
          <HeadingComponent text="Reset Password" className="mb-6" /> {/* Heading for the form */}
          <div className="flex flex-col gap-8 justify-center items-center h-full">
            {/* Formik component handles form validation and submission */}
            <Formik
              initialValues={{
                email: '',
                newPassword: '',
                rePassword: '',
              }}
              validationSchema={validationSchema} // Attach validation schema
              onSubmit={handleSubmit} // Form submission handler
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Email field */}
                  <div className="mb-5">
                    <FieldComponent
                      name="email"
                      type="email"
                      placeholder="Email"
                      className={`${
                        errors.email && touched.email ? 'input-error' : ''
                      }`} // Add error class if email is invalid
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* New Password field */}
                  <div className="mb-5">
                    <FieldComponent
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      className={`${
                        errors.newPassword && touched.newPassword
                          ? 'input-error'
                          : ''
                      }`} // Add error class if newPassword is invalid
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Confirm Password field */}
                  <div className="mb-5">
                    <FieldComponent
                      type="password"
                      name="rePassword"
                      placeholder="Re-enter Password"
                      className={`${
                        errors.rePassword && touched.rePassword
                          ? 'input-error'
                          : ''
                      }`} // Add error class if rePassword is invalid
                    />
                    <ErrorMessage
                      name="rePassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  {loading ? (
                    <Loading /> // Show loading spinner when request is in progress
                  ) : (
                    <ButtonComponent type="submit" text="Send Code" /> // Show the submit button when not loading
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPasswordForm;
