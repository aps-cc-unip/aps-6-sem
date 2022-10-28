import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import NotFound from '@/pages/NotFound'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
