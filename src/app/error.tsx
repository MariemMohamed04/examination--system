"use client";

import ErrorComponent from "@/components/common/error-component";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <ErrorComponent>{error.message}</ErrorComponent>
      <button type="button" onClick={reset} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Try Again!</button>
    </main>
  );
}