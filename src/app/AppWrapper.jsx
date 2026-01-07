import { useMediaQuery } from '@/hooks/use-media-query'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export function AppWrapper({ children }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <AuthProvider>
      <Toaster position={isMobile ? 'top-center' : 'bottom-right'} richColors={true} />
      {children}
      <SpeedInsights debug={false} />
      <Analytics debug={false} />
    </AuthProvider>
  )
}
