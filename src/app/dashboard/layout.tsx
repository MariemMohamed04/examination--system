import { Metadata } from 'next';
import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';
import ContextProviders from '@/components/context';

// Defining the type for the AuthLayout component's props
type AuthLayoutProps = {
  children: React.ReactNode; // The children elements passed into the layout
};

// Setting metadata for the page
export const metadata: Metadata = {
  title: 'Online Exam - Dashboard', // Title of the page shown in the browser tab
};

// The main AuthLayout component that renders the layout for the dashboard pages
export default function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <div className="">
      {/* Navbar component */}
      <Navbar />

      {/* Sidebar component for navigation */}
      <Sidebar />

      {/* Main content area with padding, adjusted for smaller screens */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-20">
          
          {/* Wrapping the children elements with ContextProviders for state management or context sharing */}
          <ContextProviders>
            {/* Render the children elements passed into the layout (e.g., dashboard content, widgets) */}
            {children}
          </ContextProviders>
        </div>
      </div>
    </div>
  );
}
