import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../../context/user/userSlice'
import { RootState } from '../../context/store'

interface FormData {
  email: string
  password: string
}

interface SignInUserProps {
  formData: FormData
  setFormData: (formData: FormData) => void
}

const useSignIn = () => {
  const { isPending, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signInUser = async ({ formData, setFormData }: SignInUserProps) => {
    dispatch(signInStart())

    if (!formData.email || !formData.password) {
      toast.error('All fields are required', {
        description: 'Please fill out all the fields!'
      })
      dispatch(signInFailure('All fields are required'))
      return
    }

    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message, {
          description: 'Please try again'
        })
        dispatch(signInFailure(data.message))
        return
      } else {
        toast.success(`${data.message}`, {
          description: 'Signed in successfully'
        })
        setFormData({
          email: '',
          password: ''
        })
        navigate('/dashboard', { replace: true })
        dispatch(signInSuccess(data.data))
        return data.data
      }
    } catch (error) {
      dispatch(signInFailure(error as string))
      toast.error('Something went wrong', { description: `${error}` })
    }
  }

  return { signInUser, isPending, errorMessage }
}

export default useSignIn
