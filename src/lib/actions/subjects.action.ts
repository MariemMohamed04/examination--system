/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { AUTH_TOKEN } from "../constants/api.constant";
import AppError from "../utils/app-error";

const BASE_URL = process.env.API + "/subjects";

export const getAllSubjectsAction = async () => {
  const cookiesToken = (await cookies()).get(AUTH_TOKEN)?.value;

  if (!cookiesToken) {
    throw new AppError("Unauthorized", 401);
  }

  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      token: cookiesToken,
    },
  });

  const payload: {
    message: string;
    subjects: Subject[];
    metadata: Record<string, any>;
  } = await response.json();

  if (payload.message !== "success") {
    throw new AppError(payload.message, response.status);
  }

  // Return the subjects array
  return payload.subjects;
};
