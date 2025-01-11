/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from "@/components/ui/field-component";
import Loading from "@/components/common/loading-component";
import ButtonComponent from "@/components/ui/button-component";
import HeadingComponent from '@/components/ui/header-component';
import { forgotPasswordAction, verifyCodeAction } from '@/lib/actions/auth.action';
import ResetPasswordForm from './resetPasswordForm';

type VerifyCodeProps = {
  isFormOpen: boolean;
  email: string;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({
  isFormOpen,
  email
}) => {
    // State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerifyCodeOpen, setVerifyCodeOpen] = useState<boolean>(true);
  const [isResetPasswordOpen, setResetPasswordOpen] = useState<boolean>(false);
  
    // Form & Validation
    const validationSchema = Yup.object({
      resetCode: Yup.string()
        .required("Reset Code is required")
    });

      // Function
      const handleSubmit = async (values: any) => {
        setVerifyCodeOpen(true);
        setError(null); // Clear any previous errors
        setLoading(true); // Show the loading state
      
        try {
          const { resetCode } = values;
          const response = await verifyCodeAction(resetCode);
          console.log("Response:", response);
          setVerifyCodeOpen(false);
          setResetPasswordOpen(true);
          // You can redirect to another page or show a success message here
        } catch (err: any) {
          setError(err.message); // Set the error message for display
          console.error(err);
        } finally {
          setLoading(false); // Hide the loading state
        }
      };

      const handleResend = async () => {
        setError(null); // Clear previous errors
        try {
          await forgotPasswordAction(email);
          console.log("Code resent successfully.");
        } catch (err: any) {
          setError(err.message);
          console.error("Error resending code:", err);
        }
      };
      
  
  return (
    <>
{isVerifyCodeOpen && <>
<HeadingComponent text='Verify Code' className='mb-6'/>
<div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="mb-5">
              <FieldComponent
                name="resetCode"
                type="text"
                placeholder="Enter Code"
                className={`${errors.resetCode && touched.resetCode ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="text-right mb-6">
            Didn’t receive a code?
              <button onClick={handleResend} type='button' className='pl-1 text-[#4461F2]'>Resend</button>
            </div>
            {/* Submit Button */}
            {loading ? (
              <Loading />
            ) : (
              <ButtonComponent type="submit" text="Reset Password" />
            )}
          </Form>
        )}
      </Formik>
    </div>
</>}
{isResetPasswordOpen && <ResetPasswordForm
  isFormOpen={isResetPasswordOpen}
/>}
</>
  )
}

export default VerifyCode