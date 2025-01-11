/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import AppError from "@/lib/utils/app-error";
import { AUTH_TOKEN } from "@/lib/constants/api.constant";
import { useState } from "react";

const BASE_URL = process.env.API + "/auth";

export async function GET() {
  const cookiesToken = cookies().get(AUTH_TOKEN)?.value;

  if (!cookiesToken) {
    throw new Error("No token found. Please log in.");
  }

  

}

