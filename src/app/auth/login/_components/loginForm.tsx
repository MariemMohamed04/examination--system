/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from "@/components/ui/field-component"; 
import Loading from "@/components/common/loading-component";
import ButtonComponent from "@/components/ui/button-component";
import Link from "next/link";

export default function LoginForm() {
  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
  });

  // Functions
  const handleSubmit = async (values: any) => {
    setError(null);
    setLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    setLoading(false);

    // If login was successful, redirect to the callback URL
    if (response?.ok) {
      console.log("Success")
      router.push(response.url || "/dashboard");
      return;
    }

    // Otherwise, display the error
    setError(response?.error || "fallback-error-message");
  };

  return (
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

            {/* Password Field using FieldComponent */}
            <div className="mb-5">
              <FieldComponent
                type="password"
                name="password"
                placeholder="Password"
                className={`${errors.password && touched.password ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <Link
  href={{
    pathname: "/auth/forgotPassword",
    query: {}, // Clear query parameters
  }}
  className="block"
>
  <p className="text-right mb-6">Recover Password?</p>
</Link>

            {/* Submit Button */}
            {loading ? (
              <Loading />
            ) : (
              <ButtonComponent type="submit" text="Sign in" />
            )}


          </Form>
        )}
      </Formik>
    </div>
  );
}
