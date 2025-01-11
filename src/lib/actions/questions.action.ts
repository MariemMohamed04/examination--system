/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { AUTH_TOKEN } from "../constants/api.constant";
import AppError from "../utils/app-error";

const BASE_URL = process.env.API + "/questions";

export const checkQuestionsAction = async (fields: CheckQuestionsFields) => {
  const cookiesToken = (await cookies()).get(AUTH_TOKEN)?.value;

  try {
    const response = await fetch(BASE_URL + "/check", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        token: cookiesToken || "",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new AppError(errorData.message || "Failed to check questions", response.status);
    }

    const payload = await response.json();

    // Assuming the structure of the response is like the example you provided
    return {
      message: payload.message,
      correct: payload.correct,
      wrong: payload.wrong,
      total: payload.total,
      correctQuestions: payload.correctQuestions,
      wrongQuestions: payload.WrongQuestions,
    };
  } catch (error: any) {
    throw new AppError(error.message || "An error occurred while checking questions", 500);
  }
};
