import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Router from '@/routes'
import Loading from '@/components/Loading'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </React.Suspense>
    </QueryClientProvider>
  )
}
