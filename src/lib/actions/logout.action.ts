/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { cookies } from "next/headers";
import { AUTH_TOKEN } from "../constants/api.constant";
import AppError from "../utils/app-error";

const BASE_URL = process.env.API + "/auth";

export const logoutAction = async () => {
  const cookiesToken = (await cookies()).get(AUTH_TOKEN)?.value;
  
  if (!cookiesToken) {
    throw new Error("No token found. Please log in.");
  }
  
  try {
    
    const response = await fetch(BASE_URL + "/logout", {
      method: "GET",
      headers: {
        token: cookiesToken,
      },
    });

    cookies().delete(AUTH_TOKEN);
    cookies().delete("next-auth.callback-url");
    cookies().delete("next-auth.csrf-token");
    cookies().delete("next-auth.session-token");
    console.log("Success");

    const payload = await response.json();

    console.log('Logout API Response:', payload); // Log API response

    if (payload.message !== "success") {
      throw new AppError(payload.message, payload?.code);
    }

    return payload.message;

  } catch (error) {
    console.error("Logout error:", error); // Log errors for debugging
    throw error;
  }
};