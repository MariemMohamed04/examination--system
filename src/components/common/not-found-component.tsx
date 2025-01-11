export default function NotFoundComponent() {

  return (
    <section className="flex flex-col gap-6 text-center items-center">
      <span className="text-9xl text-red-500 font-bold">404</span>

      <p className="px-3 py-2 text-lg font-medium rounded-full bg-red-50 text-red-400 border border-red-500">Not Found</p>
    </section>
  );
}