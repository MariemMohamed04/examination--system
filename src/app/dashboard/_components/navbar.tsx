import React from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './searchBar';

export default function Navbar() {
  return (
    <nav className="fixed z-50 w-full bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex ">
          <div className="flex justify-start rtl:justify-end">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <Link href={'/dashboard/home'} className=''>
              <Image src={'/assets/images/final-logo.png'} alt={'logo'} width={151} height={29} className='' />
            </Link>
          </div>
          <div className="flex ml-20 pl-7">
<div className="flex justify-between w-[1063px]">
<SearchBar />
            <div className="flex items-center">
              <div className="flex items-center">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <Image className="rounded-full" width={61} height={61} src={'/assets/images/pfp.png'} alt="user photo" />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <ul className="py-1" role="none">
                    <li>
                      <Link href={'/'} className="flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                        <MdSpaceDashboard
                          className="text-[#4461F2] group-hover:text-white transition"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-[#696F79] font-semibold text-xl group-hover:text-white transition">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className="flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                        <MdOutlineHistory
                          className="text-[#4461F2] group-hover:text-white transition"
                          style={{ fontSize: "20px" }}
                        />
                        <span className=" text-[#696F79] font-semibold text-xl group-hover:text-white transition">Quiz History</span>
                      </Link>
                    </li>
                    <li>
                      <div className="cursor-pointer flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                        <RiLogoutBoxFill
                          className="text-[#4461F2] group-hover:text-white transition"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-[#696F79] font-semibold text-xl group-hover:text-white transition">Log Out</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
