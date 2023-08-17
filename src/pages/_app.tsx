import { queryClient } from '@/lib/api-client'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MOCKING === 'enabled') {
    require('../lib/mock')
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}