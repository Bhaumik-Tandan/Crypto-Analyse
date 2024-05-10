"use client";
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
        {children}
        </Providers>
        </body>
    </html>
  )
}
