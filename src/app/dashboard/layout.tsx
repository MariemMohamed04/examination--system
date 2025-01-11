import { Metadata } from 'next';
import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';
import ContextProviders from '@/components/context';


type AuthLayoutProps = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Online Exam - Dashboard',
};

export default function AuthLayout({children }: AuthLayoutProps) {


  return (
    <div className="">
      <Navbar/>
      <Sidebar/>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-20">
        <ContextProviders>
            {children}
          </ContextProviders>
        </div>
      </div>
    </div>
  );
}