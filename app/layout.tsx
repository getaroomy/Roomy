import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import LayoutComponent from './layout_component'

export const metadata: Metadata = {
  title: 'Roomy',
  description: 'Find a roommate / tenant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <LayoutComponent>
          {children}
        </LayoutComponent>
      </body>
    </html>
  )
}
