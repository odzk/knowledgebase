import type { Metadata } from 'next'
import { Comfortaa, Raleway } from 'next/font/google'
import './globals.css'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nuvho Knowledge Base',
  description: 'Find answers to your Nuvho questions. Guides, tutorials, and documentation for Smart Hoteliers.',
  openGraph: {
    title: 'Nuvho Knowledge Base',
    description: 'Find answers to your Nuvho questions.',
    siteName: 'Nuvho Knowledge Base',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${comfortaa.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-[#F7F8F9] font-body text-iron-grey">
        {children}
      </body>
    </html>
  )
}
