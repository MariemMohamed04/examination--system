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
import {
  forgotPasswordAction,
  verifyCodeAction,
} from '@/lib/actions/auth.action';
import ResetPasswordForm from './resetPasswordForm';

// Type for the props passed to the component
type VerifyCodeProps = {
  isFormOpen: boolean;
  email: string;
};

const VerifyCode: React.FC<VerifyCodeProps> = ({ isFormOpen, email }) => {
  // State Management
  const [error, setError] = useState<string | null>(null); // To store any error messages
  const [loading, setLoading] = useState<boolean>(false); // To manage the loading state during API calls
  const [isVerifyCodeOpen, setVerifyCodeOpen] = useState<boolean>(true); // To control the visibility of the verify code form
  const [isResetPasswordOpen, setResetPasswordOpen] = useState<boolean>(false); // To control the visibility of the reset password form

  // Form Validation Schema using Yup
  const validationSchema = Yup.object({
    resetCode: Yup.string().required('Reset Code is required'), // Validates that the reset code is not empty
  });

  // Function to handle form submission
  const handleSubmit = async (values: any) => {
    setVerifyCodeOpen(true); // Show the verify code form initially
    setError(null); // Clear any previous error messages
    setLoading(true); // Set the loading state to true while making the API request

    try {
      const { resetCode } = values; // Extract the reset code from form values
      const response = await verifyCodeAction(resetCode); // Call the verify code API action

      console.log('Response:', response); // Log the response for debugging
      setVerifyCodeOpen(false); // Hide the verify code form
      setResetPasswordOpen(true); // Show the reset password form if verification is successful
      // You can redirect or show a success message here if needed
    } catch (err: any) {
      setError(err.message); // Set the error message if the API call fails
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Set the loading state back to false after the request completes
    }
  };

  // Function to handle resending the verification code
  const handleResend = async () => {
    setError(null); // Clear previous error messages
    try {
      await forgotPasswordAction(email); // Call the forgot password API to resend the code
      console.log('Code resent successfully.'); // Log the success message for debugging
    } catch (err: any) {
      setError(err.message); // Set the error message if resending the code fails
      console.error('Error resending code:', err); // Log the error for debugging
    }
  };

  return (
    <>
      {/* Show the Verify Code form if isVerifyCodeOpen is true */}
      {isVerifyCodeOpen && (
        <>
          <HeadingComponent text="Verify Code" className="mb-6" /> {/* Heading */}
          <div className="flex flex-col gap-8 justify-center items-center h-full">
            <Formik
              initialValues={{ resetCode: '' }} // Initial form values
              validationSchema={validationSchema} // Validation schema
              onSubmit={handleSubmit} // Submit handler
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  {/* Input field for the reset code */}
                  <div className="mb-5">
                    <FieldComponent
                      name="resetCode"
                      type="text"
                      placeholder="Enter Code"
                      className={`${
                        errors.resetCode && touched.resetCode
                          ? 'input-error' // Apply error class if the field is invalid
                          : ''
                      }`}
                    />
                    {/* Display error message for the resetCode field */}
                    <ErrorMessage
                      name="resetCode"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Resend code button */}
                  <div className="text-right mb-6">
                    Didn’t receive a code?
                    <button
                      onClick={handleResend} // Handle resend when clicked
                      type="button"
                      className="pl-1 text-[#4461F2]" // Styling for the link
                    >
                      Resend
                    </button>
                  </div>

                  {/* Submit Button */}
                  {loading ? (
                    <Loading /> // Show loading spinner while waiting for API response
                  ) : (
                    <ButtonComponent type="submit" text="Reset Password" /> // Submit button to reset password
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}

      {/* Show the ResetPasswordForm if isResetPasswordOpen is true */}
      {isResetPasswordOpen && (
        <ResetPasswordForm isFormOpen={isResetPasswordOpen} />
      )}
    </>
  );
};

export default VerifyCode;
