"use client"
import Image from 'next/image'
import React from 'react'

export default function SocialAuth() {
  return (
    <>
      <div className="flex justify-center items-center py-5">
        <div className="w-[132px] h-[1px] border border-[#E7E7E7]"></div>
        <div className="text-base font-normal text-left text-[#6C737F] px-2">
          Or Continue with
        </div>
        <div className="w-[132px] h-[1px] border border-[#E7E7E7]"></div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 w-[355px] h-16 justify-center items-center">
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/google-logo.png"
              alt="Logo"
              width={23.57}
              height={23.57}
            />
          </div>
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/twitter-logo.png"
              alt="Logo"
              width={23.57}
              height={23.57}
            />
          </div>
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/facebook-logo.png"
              alt="Logo"
              width={23.57}
              height={23.57}
            />
          </div>
          <div className="w-16 h-16 border rounded-2xl p-5 shadow-[0px_18.45px_30.75px_0px_rgba(68,97,242,0.11)] cursor-pointer">
            <Image
              src="/assets/icons/apple-logo.png"
              alt="Logo"
              width={23.57}
              height={23.57}
            />
          </div>

        </div>
      </div>
  </>
  )
}
