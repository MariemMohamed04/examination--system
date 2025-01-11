/* eslint-disable @typescript-eslint/no-unused-vars */
// /pages/api/questions.ts
import { AUTH_TOKEN } from '@/lib/constants/api.constant';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.API + "/questions";

export async function GET(req: Request) {
  // Get query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const exam = searchParams.get("exam");

  // Retrieve the token from cookies
  const cookiesToken = cookies().get(AUTH_TOKEN)?.value;

  if (!exam) {
    return NextResponse.json(
      { message: "Exam ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}?exam=${exam}`, {
      method: "GET",
      headers: {
        token: cookiesToken || 'no token',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch questions" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 }); // Forward the questions to the frontend
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
