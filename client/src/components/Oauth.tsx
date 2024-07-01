import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider
} from 'firebase/auth'

//components
import { app } from '../firebase'
import { Button } from './ui/button'
import { toast } from 'sonner'

//State
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '../context/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Oauth = ({ google, github }: { google: string; github: string }) => {
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
      dispatch(signInFailure(error as any))
    }
  }

  // Sign in with github
  const handleGithubAuth = async () => {
    const githubProvider = new GithubAuthProvider()

    githubProvider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      const resultsFromGithub = await signInWithPopup(auth, githubProvider)

      const userData = {
        name: resultsFromGithub.user.displayName,
        email: resultsFromGithub.user.email,
        image: resultsFromGithub.user.photoURL
      }

      console.log('User data to be sent to backend:', userData) // Log user data
      const res = await fetch('/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await res.json()

      console.log('Response from backend:', data) // Log backend response

      if (data.success === false) {
        toast.error(data.message, { description: 'Please try again!' })
      } else {
        toast.success(`${data.message}`, {
          description: 'Signed in successfully!'
        })

        dispatch(signInSuccess(data.data))

        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Error during Google Auth:', error) // Log error

      dispatch(signInFailure(error as any))
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button variant='outline' className='w-full' onClick={handleGoogleAuth}>
        {google}
      </Button>
      <Button variant='secondary' className='w-full' onClick={handleGithubAuth}>
        {github}
      </Button>
    </div>
  )
}

export default Oauth
