import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Loading from '@/components/Loading'

const Register = React.lazy(() => import('@/pages/Register'))
const Admin = React.lazy(() => import('@/pages/Admin'))
const Home = React.lazy(() => import('@/pages/Home'))
const Tasks = React.lazy(() => import('@/pages/Tasks'))

export default function Router() {
  return (
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}
