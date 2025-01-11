import { redirect } from 'next/navigation';

export default function page() {
  // Redirect to login page when user tries to access restricted pages
  redirect("/auth/login");
}
