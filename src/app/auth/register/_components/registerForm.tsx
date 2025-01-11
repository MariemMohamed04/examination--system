/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from "@/components/ui/field-component"; 
import Loading from "@/components/common/loading-component";
import ButtonComponent from "@/components/ui/button-component";
import { registerAction } from "@/lib/actions/auth.action";

export default function RegisterForm() {
    // Navigation
    const router = useRouter();

    // State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Validations
    const validationSchema = Yup.object({
      username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
      firstName: Yup.string()
      .min(3, "First name must be at least 3 characters long")
      .required("First name is required"),
      lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters long")
      .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("Password is required"),
        rePassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm password is required"),  
      phone: Yup.string()
        .typeError("Phone number must be a valid number")
        .matches(
          /^01[0125][0-9]{8}$/,
          "Phone number must start with 01 followed by 0, 1, 2, or 5 and contain 11 digits in total"
        )
        .required("Phone number is required"),
    });

    // Functions
    const handleSubmit = async (values: any) => {
      setError(null);
      setLoading(true);
      
      try {
        const 
        {username,
          firstName,
          lastName,
          email,
          password,
          rePassword,
          phone
        } = values;
        const response = await registerAction(values);
        console.log("Response:", response);
        // You can redirect to another page or show a success message here
        router.push("/dashboard");
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ 
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          rePassword: "",
          phone: "", }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="mb-5">
            <FieldComponent
                name="username"
                type="text"
                placeholder="Username"
                className={`${errors.username && touched.username ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-5">
            <FieldComponent
                name="firstName"
                type="text"
                placeholder="First Name"
                className={`${errors.firstName && touched.firstName ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-5">
            <FieldComponent
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={`${errors.lastName && touched.lastName ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
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
            <div className="mb-5">
              <FieldComponent
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                className={`${errors.rePassword && touched.rePassword? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-5">
              <FieldComponent
                name="tel"
                type="text"
                placeholder="Phone"
                className={`${errors.phone && touched.phone? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="tel"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
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
  )
}
