import { Metadata } from 'next';
import SideSection from './_components/sideSection';
import Header from './_components/header';
import SocialAuth from './_components/socialAuth';

type AuthLayoutProps = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Online Exam - Auth',
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="sideOne hidden lg:block">
        <SideSection />
      </div>
      <div className="sideTwo col-span-1 lg:col-span-1 mb-20">
        <Header />
        <div className="mt-[50px]">
          {children}
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}
