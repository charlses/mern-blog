import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '../context/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Oauth = ({ title }: { title: string }) => {
  const dispatch = useDispatch()
  const auth = getAuth(app)
  const navigate = useNavigate()

  const handleGoogleAuth = async () => {
    const googleProvider = new GoogleAuthProvider()
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      const resultFromGoogle = await signInWithPopup(auth, googleProvider)

      const userData = {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        image: resultFromGoogle.user.photoURL
      }

      console.log('User data to be sent to backend:', userData) // Log user data

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await res.json()
      console.log('Response from backend:', data) // Log backend response

      if (data.success === false) {
        console.log('Dispatching signInFailure with message:', data.message)
        toast.error(data.message, {
          description: 'Please try again'
        })
        dispatch(signInFailure(data.message))
      } else {
        console.log('Dispatching signInSuccess with data:', data.data)
        toast.success(`${data.message}`, {
          description: 'Signed in successfully'
        })
        dispatch(signInSuccess(data.data))
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Error during Google Auth:', error) // Log error
      dispatch(signInFailure(error))
    }
  }

  return (
    <Button variant='outline' className='w-full' onClick={handleGoogleAuth}>
      {title}
    </Button>
  )
}

export default Oauth
