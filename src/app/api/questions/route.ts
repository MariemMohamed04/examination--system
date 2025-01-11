/* eslint-disable @typescript-eslint/no-unused-vars */
// /pages/api/questions.ts

import { AUTH_TOKEN } from '@/lib/constants/api.constant';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Define the base URL for the external API that provides question data
const BASE_URL = process.env.API + '/questions';

// Handler for GET requests to fetch questions
export async function GET(req: Request) {
  // Step 1: Extract query parameters from the request URL
  const { searchParams } = new URL(req.url); // Parse the request URL to get query parameters
  const exam = searchParams.get('exam'); // Extract the "exam" parameter

  // Step 2: Retrieve the authentication token from cookies
  const cookiesToken = cookies().get(AUTH_TOKEN)?.value;

  // Step 3: Validate the presence of the "exam" parameter
  if (!exam) {
    return NextResponse.json(
      { message: 'Exam ID is required' }, // Inform the client that "exam" is a mandatory parameter
      { status: 400 } // Return a 400 Bad Request status
    );
  }

  try {
    // Step 4: Make an API request to the external server to fetch questions
    const response = await fetch(`${BASE_URL}?exam=${exam}`, {
      method: 'GET', // HTTP GET method
      headers: {
        token: cookiesToken || 'no token', // Include the token for authentication (use "no token" as fallback)
      },
    });

    // Step 5: Check if the response from the external API is successful
    if (!response.ok) {
      const errorData = await response.json(); // Parse error details from the response
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch questions' }, // Forward the error message to the client
        { status: response.status } // Use the status code from the external API response
      );
    }

    // Step 6: Parse the successful response from the external API
    const data = await response.json();
    return NextResponse.json(data, { status: 200 }); // Forward the question data to the frontend with a 200 OK status
  } catch (error) {
    // Step 7: Handle unexpected server errors
    return NextResponse.json(
      { message: 'Internal server error' }, // Inform the client about an internal server error
      { status: 500 } // Return a 500 Internal Server Error status
    );
  }
}
