import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/context/store'
import useSignOut from '@/hooks/auth/useSignOut'

const UserAvatar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)
  const { signOut } = useSignOut()
  return (
    <>
      {currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <Avatar>
                <AvatarImage
                  src={currentUser.image || ''}
                  alt='Profile Image'
                />
                <AvatarFallback>
                  {currentUser.firstname[0]}
                  {currentUser.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
              <Link to='/dashboard/profile'>
                <DropdownMenuItem>
                  <div className='flex items-center justify-center gap-3'>
                    <Avatar>
                      <AvatarImage
                        src={currentUser.image || ''}
                        alt='Profile Image'
                      />
                      <AvatarFallback>
                        {currentUser.firstname[0]}
                        {currentUser.lastname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start justify-center h-full'>
                      <p>
                        {currentUser.firstname} {currentUser.lastname}
                      </p>
                      <p className='font-extralight text-muted-foreground text-xs'>
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuLabel>
            <Link to='/dashboard'>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <Link to='/dashboard/settings'>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <Link to='/support'>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='flex gap-2 font-extralight'
              onClick={signOut}
            >
              <LogOutIcon className='h-5 w-5' />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default UserAvatar
