import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

//sign up hook
import useSignUp from '../hooks/auth/useSignUp'
import Loader from '../components/ui/loader'
import Oauth from '../components/Oauth'

import { useSelector } from 'react-redux'
import { RootState } from '../context/store'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { signUpUser } = useSignUp()
  const { isPending } = useSelector((state: RootState) => state.user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signUpUser({ formData, setFormData })
  }

  return (
    <main className='flex items-center justify-center min-h-[80vh] my-16 mx-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='first-name'>First name</Label>
                <Input
                  id='first-name'
                  name='firstname'
                  placeholder='Max'
                  value={formData.firstname}
                  onChange={handleChange}
                  disabled={isPending}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last-name'>Last name</Label>
                <Input
                  id='last-name'
                  placeholder='Robinson'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
                  disabled={isPending}
                  required
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                name='email'
                value={formData.email}
                onChange={handleChange}
                disabled={isPending}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='* * * * * *'
                name='password'
                value={formData.password}
                onChange={handleChange}
                disabled={isPending}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='* * * * * *'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isPending}
                required
              />
            </div>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? <Loader /> : 'Create an account'}
            </Button>
            <Oauth
              google='Continue with google'
              github='Continue with GitHub'
            />
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/sign-in' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default SignUpPage
