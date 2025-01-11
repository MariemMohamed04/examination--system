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
import { resetPasswordAction } from '@/lib/actions/auth.action';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type ResetPasswordProps = {
  isFormOpen: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  isFormOpen
}) => {
  const router = useRouter();
    // State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
      rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm password is required"),  
  });

  const handleSubmit = async (values: any) => {
    setError(null); // Clear any previous errors
    setLoading(true); // Show the loading state
  
    try {
      const { email, newPassword } = values;
      const response = await resetPasswordAction(email, newPassword);
      console.log("Response:", response);
      router.push("/auth/login");
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
{isFormOpen && <>
  <HeadingComponent text='Reset Password' className='mb-6'/>
<div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{
          email: "",
          newPassword: "",
          rePassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
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
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-5">
            <FieldComponent
                type="password"
                name="newPassword"
                placeholder="New Password"
                className={`${errors.newPassword && touched.newPassword ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-5">
            <FieldComponent
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                className={`${errors.rePassword && touched.rePassword ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm"
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
</>}
</>
  )
}

export default ResetPasswordForm