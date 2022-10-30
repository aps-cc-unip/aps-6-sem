import { Navigate } from 'react-router-dom'

import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'

import Loading from '@/components/Loading'

type PrivateRouteProps = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { validating, user } = useBox(authBox)

  if (validating) {
    return <Loading />
  }

  if (!validating && !user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
