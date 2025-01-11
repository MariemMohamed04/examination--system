/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { forgotPasswordAction } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from "@/components/ui/field-component";
import Loading from "@/components/common/loading-component";
import ButtonComponent from "@/components/ui/button-component";
import HeadingComponent from '@/components/ui/header-component';
import VerifyCode from './verifyCodeForm';


const ForgotPasswordForm = () => {
  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(true);
  const [isVerifyCodeOpen, setVerifyCodeOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");


  // Form & Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
  });

  // Function
  const handleSubmit = async (values: any) => {
    setForgotPasswordOpen(true);
    setError(null); // Clear any previous errors
    setLoading(true); // Show the loading state
  
    try {
      const { email } = values;
      setEmail(email);
      const response = await forgotPasswordAction(email);
      console.log("Response:", response);
      setForgotPasswordOpen(false);
      setVerifyCodeOpen(true);
      // You can redirect to another page or show a success message here
    } catch (err: any) {
      setError(err.message); // Set the error message for display
      console.error(err);
    } finally {
      setLoading(false); // Hide the loading state
    }
  };
  


  return (
<>
{isForgotPasswordOpen && 
  <>
  <HeadingComponent text='Forgot Password' className='mb-6'/>
<div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {/* Email Field */}
            <div className="mb-5">
              <FieldComponent
                name="email"
                type="email"
                placeholder="Email"
                className={`${errors.email && touched.email ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* Submit Button */}
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
}
{isVerifyCodeOpen && <VerifyCode
isFormOpen={isVerifyCodeOpen}
email = {email}
/>}
</>
  )
}

export default ForgotPasswordForm