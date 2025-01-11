import HeadingComponent from '@/components/ui/header-component';
import LoginForm from './_components/loginForm';

export default function Page() {
  return (
    <section className="flex justify-center items-center flex-col">
      {/* Heading */}
      <HeadingComponent text="Sign in" className="mb-6" />

      {/* Login Form */}
      <LoginForm />
    </section>
  );
}
