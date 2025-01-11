// Importing necessary components and types
import { Metadata } from 'next';
import SideSection from './_components/sideSection'; 
import Header from './_components/header'; 
import SocialAuth from './_components/socialAuth'; 

// Defining the type for the AuthLayout component's props
type AuthLayoutProps = {
  children: React.ReactNode; // The children elements passed into the layout
};

// Setting metadata for the page
export const metadata: Metadata = {
  title: 'Online Exam - Auth', // Title of the page shown in the browser tab
};

// The main AuthLayout component that renders the layout for the authentication pages
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Main container with grid layout for large screens
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      
      {/* Side section for larger screens, hidden on small screens */}
      <div className="sideOne hidden lg:block">
        <SideSection /> {/* Side content for larger screens */}
      </div>

      {/* Main content area for both small and large screens */}
      <div className="sideTwo col-span-1 lg:col-span-1 mb-20">
        <Header /> {/* Header component */}
        
        <div className="mt-[50px]">
          {/* Render the children elements */}
          {children}
          
          {/* Social authentication component */}
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}
