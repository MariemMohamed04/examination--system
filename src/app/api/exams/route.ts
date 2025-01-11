/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import AppError from "@/lib/utils/app-error";
import { AUTH_TOKEN } from "@/lib/constants/api.constant";

const BASE_URL = process.env.API + "/exams";

export async function GET(req: Request) {
  try {
    // Extract search parameters
    const url = new URL(req.url);
    const subjectId = url.searchParams.get("subject");
    console.log("Subject ID:", subjectId);

    if (!subjectId) {
      throw new AppError("Subject ID is required", 400);
    }

    // Get the authentication token from cookies
    const cookiesToken = cookies().get(AUTH_TOKEN)?.value;
    console.log("AUTH_TOKEN:", cookiesToken);

    if (!cookiesToken) {
      throw new AppError("Unauthorized", 401);
    }

    // Make the API call to the external server
    const response = await fetch(`${BASE_URL}?subject=${subjectId}`, {
      method: "GET",
      headers: {
        token: cookiesToken,
      },
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from API:", errorText);
      throw new AppError(`Failed to fetch exams: ${errorText}`, response.status);
    }

    // Parse the response
    const data = await response.json();
    console.log("API Response Data:", data);

    // Return the response to the client
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Error in /api/exams:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: error.statusCode || 500 }
    );
  }
}
