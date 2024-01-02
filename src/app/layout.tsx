import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nomad Networks',
  description: 'Nomad Networks is a forward-thinking software solutions company specializing in the development of innovative applications and services. With a focus on mobility and connectivity, we aim to empower digital nomads and remote workers around the globe. Our solutions are designed to enhance productivity, streamline workflows, and foster collaboration, no matter where your journey takes you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        {children}
        </body>
    </html>
  )
}
