/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use server";

import { cookies } from "next/headers";
import { AUTH_TOKEN, JSON_HEADER } from "../constants/api.constant";
import AppError from "../utils/app-error";
import Swal from "sweetalert2";

const BASE_URL = process.env.API + "/auth";

export const registerAction = async (fields: RegisterFields) => {
  const response = await fetch(BASE_URL + "/signup", {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: APIResponse<LoginResponse> = await response.json();

  if (payload.message === "success") {
    return payload.user; // Return user data
  }

  throw new AppError(payload.message, payload.statusCode);
};

export const getUserInfo = async () => {
  const cookiesToken = (await cookies()).get(AUTH_TOKEN)?.value;

  if (!cookiesToken) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(BASE_URL + "/profileData", {
    method: "GET",
    headers: {
token: cookiesToken, 
    },
  });

  const payload: APIResponse<LoginResponse> = await response.json();
  
  if (payload.message === "success") {
    return payload.user; // Return user data
  }

  throw new AppError(payload.message, payload.statusCode);
};

export const forgotPasswordAction = async (email: string) => {
  const response = await fetch(BASE_URL + "/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      ...JSON_HEADER,
    },
  });

  if (!response.ok) {
    // Handle HTTP errors
    const errorPayload = await response.json();
    throw new AppError(errorPayload.message, response.status);
  }

  const payload: {
    message: string;
    info?: string;
    code?: number;
  } = await response.json();

  if (payload.message !== "success") {
    throw new AppError(payload.message, payload.code || response.status);
  }

  return payload.info;
};

export const verifyCodeAction = async (resetCode: string) => {
  console.log("Request Body:", JSON.stringify({ resetCode }));

  const response = await fetch(BASE_URL + "/verifyResetCode", {
    method: "POST",
    body: JSON.stringify({ resetCode }),
  });

  if (!response.ok) {
    // Handle HTTP errors
    const errorPayload = await response.json();
    throw new AppError(errorPayload.message, response.status);
  }

  const payload: {
    message: string;
    status?: string;
    code?: number;
  } = await response.json();

  if (payload.message !== "success") {
    throw new AppError(payload.message, payload.code || response.status);
  }

  return payload.status;
};

export const resetPasswordAction = async (email: string, newPassword: string) => {
  const response = await fetch(BASE_URL + "/verifyResetCode", {
    method: "PUT",
    body: JSON.stringify({ email, newPassword }),
    headers: {
      ...JSON_HEADER,
    },
  });

  if (!response.ok) {
    // Handle HTTP errors
    const errorPayload = await response.json();
    throw new AppError(errorPayload.message, response.status);
  }

  const payload: {
    message: string;
    code?: number;
  } = await response.json();

  if (payload.message !== "success") {
    throw new AppError(payload.message, payload.code || response.status);
  }

  return payload.message;
};

