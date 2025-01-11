/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import AppError from '@/lib/utils/app-error';
import { AUTH_TOKEN } from '@/lib/constants/api.constant';

// Base URL for the external API that handles exam-related operations
const BASE_URL = process.env.API + '/exams';

// Handler for the GET request
export async function GET(req: Request) {
  try {
    // Step 1: Extract the `subjectId` from the query parameters of the request URL
    const url = new URL(req.url);
    const subjectId = url.searchParams.get('subject');
    console.log('Subject ID:', subjectId);

    // Step 2: Validate the presence of `subjectId`
    if (!subjectId) {
      throw new AppError('Subject ID is required', 400); // Throw a custom error if `subjectId` is missing
    }

    // Step 3: Retrieve the authentication token from cookies
    const cookiesToken = cookies().get(AUTH_TOKEN)?.value;
    console.log('AUTH_TOKEN:', cookiesToken);

    // Step 4: Validate the presence of the authentication token
    if (!cookiesToken) {
      throw new AppError('Unauthorized', 401); // Throw a custom error if the token is not available
    }

    // Step 5: Make an API call to the external server to fetch exams
    const response = await fetch(`${BASE_URL}?subject=${subjectId}`, {
      method: 'GET',
      headers: {
        token: cookiesToken, // Include the token in the request headers for authentication
      },
    });

    console.log('API Response Status:', response.status);

    // Step 6: Handle non-OK responses from the API
    if (!response.ok) {
      const errorText = await response.text(); // Read the error message from the response body
      console.error('Error from API:', errorText);
      throw new AppError(
        `Failed to fetch exams: ${errorText}`, // Include the error message in the custom error
        response.status // Use the API's status code for error response
      );
    }

    // Step 7: Parse the JSON response from the API
    const data = await response.json();
    console.log('API Response Data:', data);

    // Step 8: Return the successful response to the client as JSON
    return NextResponse.json(data);
  } catch (error: any) {
    // Step 9: Handle errors that occur during the process
    console.error('Error in /api/exams:', error);

    // Return a JSON error response to the client with the appropriate status code
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' }, // Provide a default error message if `error.message` is undefined
      { status: error.statusCode || 500 } // Use the error's status code or default to 500 (Internal Server Error)
    );
  }
}
