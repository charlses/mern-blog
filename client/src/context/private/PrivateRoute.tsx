import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Outlet, Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)
  return currentUser ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to='/sign-in' />
      {toast.error('Access Denied!', {
        description: 'You need to be authenticated to access this route!'
      })}
    </>
  )
}

export default PrivateRoute
