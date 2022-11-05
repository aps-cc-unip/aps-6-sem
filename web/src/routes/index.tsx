import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useBox } from '@/lib/blackbox'

import { setAuthToken } from '@/shared/axios'
import { authBox, revalidateAuthState, setValidating } from '@/stores/auth'
import { getJwtToken } from '@/services/storage/auth'

import PrivateRoute from '@/routes/PrivateRoute'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Loading from '@/components/Loading'

const Register = React.lazy(() => import('@/pages/Register'))
const Admin = React.lazy(() => import('@/pages/app/Admin'))
const Home = React.lazy(() => import('@/pages/app/Home'))
const Tasks = React.lazy(() => import('@/pages/app/Tasks'))
const Users = React.lazy(() => import('@/pages/app/Users'))
const Invoices = React.lazy(() => import('@/pages/app/Invoices'))
const Incidents = React.lazy(() => import('@/pages/app/Incidents'))

const publicRoutes = [
  '/',
  '/register'
]

export default function Router() {
  const navigate = useNavigate()
  const auth = useBox(authBox)

  useEffect(() => {
    const token = getJwtToken()

    if (token) {
      setValidating(true)
      setAuthToken(token)
      revalidateAuthState(token)
        .then(() => {
          if (publicRoutes.includes(window.location.pathname)) {
            navigate('/app/home')
          }
        })
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
        path="/app/incidents"
        element={
          <PrivateRoute>
            <Incidents />
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
