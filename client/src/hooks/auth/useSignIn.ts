import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string
  password: string
}

interface SignInUserProps {
  formData: FormData
  setFormData: (formData: FormData) => void
}

const useSignIn = () => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const signInUser = async ({ formData, setFormData }: SignInUserProps) => {
    setIsPending(true)

    if (!formData.email || !formData.password) {
      toast.error('All fields are required', {
        description: 'Please fill out all the fields!'
      })
      setIsPending(false)
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
        setIsPending(false)
        return
      } else {
        toast.success(`${data.message}`, {
          description: 'Signed in successfully'
        })
        setFormData({
          email: '',
          password: ''
        })
        setIsPending(false)
        navigate('/dashboard', { replace: true })
        return data.data
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong', { description: `${error}` })
    }
    setIsPending(false)
  }

  return { signInUser, isPending }
}

export default useSignIn
