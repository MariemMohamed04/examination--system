import Providers from '@/components/providers';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg" />
      <body>
        {/* Wrap Providers around children */}
        <Providers>
          {/* Render the children elements */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
