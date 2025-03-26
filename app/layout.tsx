import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import ToolModal from "@/components/tool-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Explore the best AI tools in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <ToolModal />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'