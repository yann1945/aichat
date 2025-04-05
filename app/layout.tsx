import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Chatbot AI',
  description: 'Dark themed AI chatbot using Neoxr API'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}