"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Header() {
  const activeLinkStyles = 'shadow-lg border-3 border-blue-600 rounded-lg';
  const pathname = usePathname();


  return (
    <div className="flex justify-end items-center mt-[40px]">
    <div className=" text-right h-[42px] w-[362px] pr-[80px]">
    <Link
                    href="/auth/login"
                    className={`${
                      pathname === '/auth/login'
                        ? activeLinkStyles
                        : ''
                    } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className={`${
                      pathname === '/auth/register'
                        ? activeLinkStyles
                        : ''
                    } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Register
                  </Link>
    </div>
          </div>
  )
}
