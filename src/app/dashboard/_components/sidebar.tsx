"use client"
import React, { useState } from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/lib/actions/logout.action';
import PopupModal from '@/components/custom/popup-component';
// import Swal from "sweetalert2";

export default function Sidebar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleLogout = async () => {
    if (isConfirmed) {
      const response = await logoutAction();
      console.log("Response", response);
      router.push("/auth/login");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleConfirmLogout = () => {
    setIsConfirmed(true); 
    handleLogout(); 
    setIsModalOpen(false); 
  };

  return (
    <>
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
      <ul className="space-y-2 font-medium ">
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
        <div onClick={handleOpenModal} className="cursor-pointer flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                <RiLogoutBoxFill
                  className="text-[#4461F2] group-hover:text-white transition"
                  style={{ fontSize: "20px" }}
                />
                <span className="text-[#696F79] font-semibold text-xl group-hover:text-white transition">Log Out</span>
              </div>
        </li>

      </ul>
    </div>
  </aside>

  <PopupModal
        isModalOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmLogout} 
      />
    </>
  )
}
