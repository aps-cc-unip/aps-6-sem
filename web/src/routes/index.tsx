import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useBox } from '@/lib/blackbox'

import { authBox, revalidateAuthState, setValidating } from '@/stores/auth'
import { getJwtToken } from '@/services/storage/auth'

import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import PrivateRoute from '@/routes/PrivateRoute'
import Loading from '@/components/Loading'
import Locations from '@/pages/Locations'

const Register = React.lazy(() => import('@/pages/Register'))
const Admin = React.lazy(() => import('@/pages/Admin'))
const Home = React.lazy(() => import('@/pages/Home'))
const Tasks = React.lazy(() => import('@/pages/Tasks'))
const Users = React.lazy(() => import('@/pages/Users'))
const Invoices = React.lazy(() => import('@/pages/Invoices'))

export default function Router() {
  const auth = useBox(authBox)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getJwtToken()

    if (token) {
      setValidating(true)
      revalidateAuthState(token)
    } else {
      setValidating(false)
    }
  }, [])

  if (auth.validating) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/app/locations"
        element={
          <PrivateRoute>
            <Locations />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/invoices"
        element={
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
