import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface FormData {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
}

interface SignUpUserProps {
  formData: FormData
  setFormData: (formData: FormData) => void
}

const useSignUp = () => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const signUpUser = async ({ formData, setFormData }: SignUpUserProps) => {
    setIsPending(true)
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        description: 'The passwords must match!'
      })
      setIsPending(false)
      return
    }

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password
    ) {
      toast.error('All fields are required', {
        description: 'Please fill out all the fields!'
      })
      setIsPending(false)
      return
    }

    if (formData.password.length < 6) {
      toast.error('Please choose a longer password!', {
        description: 'Password must be at least 6 characters'
      })
      setIsPending(false)
      return
    }

    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message, {
          description:
            'The email you are trying to sign up with is already in use!'
        })
        setIsPending(false)
        return
      } else {
        toast.success(`${data.message}`, {
          description:
            'An email confirmation was sent to your email, please confirm it to access your account!'
        })
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setIsPending(false)
        navigate('/sign-in', { replace: true })
        return data.data
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong', { description: `${error}` })
    }
  }

  return { signUpUser, isPending }
}

export default useSignUp
