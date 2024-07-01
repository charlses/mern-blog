import { toast } from 'sonner'
import { signOutSuccess } from '@/context/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useSignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signOut = async () => {
    try {
      const res = await fetch('/api/auth/sign-out', {
        method: 'POST'
      })
      const data = await res.json()

      if (data.success === true) {
        dispatch(signOutSuccess())
        navigate('/', { replace: true })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return { signOut }
}

export default useSignOut
