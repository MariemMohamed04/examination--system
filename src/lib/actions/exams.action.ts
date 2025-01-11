/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { AUTH_TOKEN } from "../constants/api.constant";
import AppError from "../utils/app-error";

const BASE_URL = process.env.API + "/exams";

export const getExamsOnSubjectsAction = async (subjectId: string) => {
  const cookiesToken = (await cookies()).get(AUTH_TOKEN)?.value;

  if (!cookiesToken) {
    throw new AppError("Unauthorized", 401);
  }

  const response = await fetch(BASE_URL + subjectId, {
    method: "GET",
    headers: {
      token: cookiesToken,
    },
  });

  const payload: {
    message: string;
    exams: Exam[];
    metadata: Record<string, any>;
  } = await response.json();

  if (payload.message !== "success") {
    throw new AppError(payload.message, response.status);
  }

  // Return the subjects array
  return payload.exams;
};
