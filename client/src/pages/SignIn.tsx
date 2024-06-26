import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import Loader from '../components/ui/loader'
import useSignIn from '../hooks/auth/useSignIn'
import Oauth from '../components/Oauth'

import { useSelector } from 'react-redux'
import { RootState } from '../context/store'

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { signInUser } = useSignIn()
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
    const data = await signInUser({ formData, setFormData })
    console.log(data)
  }

  return (
    <main className='flex items-center justify-center min-h-[80vh] my-16 mx-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
                value={formData.email}
                onChange={handleChange}
                disabled={isPending}
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  to='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
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
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? <Loader /> : 'Sign in'}
            </Button>
            <Oauth title='Login with Google' />
          </form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/sign-up' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default SignInPage
