import Providers from "@/components/providers";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html>
      <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg" />
      <body>
        <Providers>

        {children}
        </Providers>
      </body>
    </html>
  )
}