"use client";
import { AuthContextProvider } from './context/AuthContext'
import Navigation from './components/navigation';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider>
        <Navigation />
        {children}
    </AuthContextProvider>
  )
}
