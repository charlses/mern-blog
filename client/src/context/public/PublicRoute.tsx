import { useSelector } from 'react-redux'
import { RootState } from '@/context/store'
import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)
  return currentUser ? <Navigate to='/dashboard' /> : <Outlet />
}

export default PublicRoute
