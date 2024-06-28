import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

import { useSelector } from 'react-redux'
import { RootState } from '../context/store'
import { Button } from '../components/ui/button'

const SettingsPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <main className='mx-4 sm:ml-20 mt-20 mb-20 space-y-8'>
      {currentUser && (
        <>
          <Card className='max-w-[800px]'>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Edit and update your information!
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {currentUser.image && (
                <div className='w-32 h-32 rounded-full border-4'>
                  <img
                    src={currentUser.image}
                    alt='Profile image'
                    className='rounded-full'
                  />
                </div>
              )}
              <form className='flex flex-col space-y-4'>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='firstname' className='ml-1'>
                    First Name
                  </Label>
                  <Input
                    id='firstname'
                    name='firstname'
                    value={currentUser.firstname}
                  />
                </div>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='lastname' className='ml-1'>
                    Last Name
                  </Label>
                  <Input
                    id='lastname'
                    name='lastname'
                    value={currentUser.lastname}
                  />
                </div>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='lastname' className='ml-1'>
                    Email
                  </Label>
                  <Input id='email' name='email' value={currentUser.email} />
                </div>
                <Button>Update Information</Button>
              </form>
            </CardContent>
          </Card>

          <Card className='max-w-[800px]'>
            <CardHeader>
              <CardDescription>Edit your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4 flex flex-col'>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='current-password' className='ml-1'>
                    Current Password
                  </Label>
                  <Input type='password' id='current-password' />
                </div>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='new-password' className='ml-1'>
                    New Password
                  </Label>
                  <Input type='password' id='new-password' />
                </div>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='confirm-password' className='ml-1'>
                    Confirm New Password
                  </Label>
                  <Input type='password' id='confirm-password' />
                </div>
                <Button>Save New Password</Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}

export default SettingsPage
