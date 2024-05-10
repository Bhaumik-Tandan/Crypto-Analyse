"use client";
import Auth from "./components/Auth";
import Providers from "./components/Providers";
export default function RootLayout({
  children,
  params:{session}
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Auth/>
        {children}
        </Providers>
        </body>
    </html>
  )
}
