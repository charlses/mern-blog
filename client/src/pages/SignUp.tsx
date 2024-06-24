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

const SignUpPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('sign-up form submitted')
  }

  return (
    <main className='flex items-center justify-center min-h-[80vh] my-4'>
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
                <Input id='first-name' placeholder='Max' required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last-name'>Last name</Label>
                <Input id='last-name' placeholder='Robinson' required />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='* * * * * *'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='* * * * * *'
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              Create an account
            </Button>
            <Button variant='outline' className='w-full' type='button'>
              Sign up with GitHub
            </Button>
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
