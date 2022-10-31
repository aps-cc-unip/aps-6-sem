import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useBox } from '@/lib/blackbox'

import { getUsers } from '@/services/api/users'
import { authBox, setToken, setUser, setValidating } from '@/stores/auth'
import { getJwtToken, setJwtToken } from '@/services/storage/auth'

import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import PrivateRoute from '@/routes/PrivateRoute'
import Loading from '@/components/Loading'

const Register = React.lazy(() => import('@/pages/Register'))
const Admin = React.lazy(() => import('@/pages/Admin'))
const Home = React.lazy(() => import('@/pages/Home'))
const Tasks = React.lazy(() => import('@/pages/Tasks'))
const Users = React.lazy(() => import('@/pages/Users'))
const Invoices = React.lazy(() => import('@/pages/Invoices'))

export default function Router() {
  const auth = useBox(authBox)
  const navigate = useNavigate()

  const revalidateAuthState = async (token: string) => {
    try {
      const users = await getUsers()

      const user = users[0]

      setUser(user)
      setToken(token)
      navigate('/app/home')
    } finally {
      setValidating(false)
    }
  }

  useEffect(() => {
    setJwtToken('fucking_hell_what_the_fuck')

    const token = getJwtToken()

    if (token) {
      setValidating(true)
      revalidateAuthState(token)
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
