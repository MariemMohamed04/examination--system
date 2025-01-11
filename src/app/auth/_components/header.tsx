'use client';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
  // CSS styles for active links
  const activeLinkStyles = 'shadow-lg border-3 border-blue-600 rounded-lg';

  // Get the current pathname (e.g., '/auth/login' or '/auth/register')
  const pathname = usePathname();

  return (
    <div className="flex justify-end items-center mt-[40px]">
      {/* Container for navigation links */}
      <div className="text-right h-[42px] w-[362px] pr-[80px]">
        {/* Link to the Login page */}
        <Link
          href="/auth/login" // Navigation path for the login page
          className={`${
            pathname === '/auth/login' ? activeLinkStyles : '' // Apply active styles if the current page is '/auth/login'
          } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
        >
          Sign In {/* Text displayed for the link */}
        </Link>

        {/* Link to the Register page */}
        <Link
          href="/auth/register" // Navigation path for the register page
          className={`${
            pathname === '/auth/register' ? activeLinkStyles : '' // Apply active styles if the current page is '/auth/register'
          } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
        >
          Register {/* Text displayed for the link */}
        </Link>
      </div>
    </div>
  );
}
