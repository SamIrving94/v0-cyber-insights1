import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientProfileProvider } from "@/context/ClientProfileContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WTW Cyber Insights Tool",
  description: "Revealing Coverage Gaps with Real-World Data",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientProfileProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center">
                  <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-blue-600 rounded"></div>
                    <span className="text-xl font-semibold">WTW Cyber Insights</span>
                  </Link>
                </div>
              </header>
              <main className="flex-grow">{children}</main>
              <footer className="border-t border-gray-200 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                  © {new Date().getFullYear()} Willis Towers Watson. All rights reserved.
                </div>
              </footer>
            </div>
          </ClientProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
