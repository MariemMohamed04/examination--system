type ErrorComponentProps = {
  children?: React.ReactNode;
};

export default function ErrorComponent({ children }: ErrorComponentProps) {

  return (
    <section className="flex flex-col gap-6 text-center items-center">
      <span className="text-9xl text-red-500 font-bold">Error</span>

      <p className="px-3 py-2 rounded-full bg-red-50 text-red-400 border border-red-500">{children || "fallback-error-message"}</p>
    </section>
  );
}