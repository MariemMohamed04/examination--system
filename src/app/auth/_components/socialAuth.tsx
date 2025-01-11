'use client'; 
import Image from 'next/image';
import React from 'react';

// Component: SocialAuth
// This component renders a social authentication section with divider lines and social media icons
export default function SocialAuth() {
  return (
    <>
      {/* Divider section with "Or Continue with" text */}
      <div className="flex justify-center items-center py-5">
        {/* Left divider line */}
        <div className="w-[132px] h-[1px] border border-[#E7E7E7]"></div>
        {/* Divider text */}
        <div className="text-base font-normal text-left text-[#6C737F] px-2">
          Or Continue with
        </div>
        {/* Right divider line */}
        <div className="w-[132px] h-[1px] border border-[#E7E7E7]"></div>
      </div>

      {/* Social media icon grid */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 w-[355px] h-16 justify-center items-center">
          {/* Social media icon: Google */}
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/google-logo.png" // Path to Google logo
              alt="Google Logo" // Alternative text for accessibility
              width={23.57} // Logo width
              height={23.57} // Logo height
            />
          </div>

          {/* Social media icon: Twitter */}
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/twitter-logo.png" // Path to Twitter logo
              alt="Twitter Logo" // Alternative text for accessibility
              width={23.57} // Logo width
              height={23.57} // Logo height
            />
          </div>

          {/* Social media icon: Facebook */}
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/facebook-logo.png" // Path to Facebook logo
              alt="Facebook Logo" // Alternative text for accessibility
              width={23.57} // Logo width
              height={23.57} // Logo height
            />
          </div>

          {/* Social media icon: Apple */}
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/apple-logo.png" // Path to Apple logo
              alt="Apple Logo" // Alternative text for accessibility
              width={23.57} // Logo width
              height={23.57} // Logo height
            />
          </div>
        </div>
      </div>
    </>
  );
}
