import HeadingComponent from '@/components/ui/header-component';
import React from 'react';
import RegisterForm from './_components/registerForm';

export default function Page() {
  return (
    <section className="flex justify-center items-center flex-col">
      {/* Heading */}
      <HeadingComponent text="Sign up" className="mb-6" />
      {/* Register Form */}
      <RegisterForm />
    </section>
  );
}
