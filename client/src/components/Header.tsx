import { Link, useLocation } from 'react-router-dom'

//ShadcnUI components
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ModeToggle } from './theme/mode-toggle'
//Icons
import { Package2, Search, LogInIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../context/store'
//Navigation components
import AuthedMobileAside from './authed/MobileAside'
import Aside from './authed/Aside'
import MobileNav from './MobileNav'
import UserAvatar from './authed/UserAvatar'

const Header = () => {
  const path = useLocation().pathname
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <header className='fixed w-screen top-0 flex h-16 z-10 items-center gap-4 border-b bg-background px-4 md:px-6'>
      {currentUser ? (
        <Aside />
      ) : (
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link
            to='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Charlses - blog</span>
          </Link>
          <Link
            to='/about'
            className={` transition-colors hover:text-foreground ${
              path === '/about' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            About
          </Link>
          <Link
            to='/projects'
            className={`transition-colors hover:text-foreground ${
              path === '/projects'
                ? 'text-foreground'
                : 'text-muted-foreground '
            }`}
          >
            Projects
          </Link>
          <Link
            to='/blog'
            className={`transition-colors hover:text-foreground ${
              path === '/blog' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Blog
          </Link>
          <Link
            to='/contact'
            className={`transition-colors hover:text-foreground ${
              path === '/contact' ? 'text-foreground' : 'text-muted-foreground '
            }`}
          >
            Contact
          </Link>
          <Link
            to='/services'
            className={`transition-colors hover:text-foreground ${
              path === '/services'
                ? 'text-foreground'
                : 'text-muted-foreground '
            }`}
          >
            Services
          </Link>
        </nav>
      )}
      {currentUser && (
        <div className='hidden flex-col gap-6 text-lg font-medium sm:flex sm:flex-row sm:items-center sm:gap-5 sm:text-sm lg:gap-6'>
          <Link
            to='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Charlses - blog</span>
          </Link>
        </div>
      )}
      {currentUser ? <AuthedMobileAside /> : <MobileNav />}
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search Blog'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </form>
        <ModeToggle />
        {currentUser ? (
          <UserAvatar />
        ) : (
          <Link to='/sign-in' className='hidden md:block'>
            <Button
              variant='outline'
              className='flex gap-2 items-center justify-center font-extralight'
            >
              <LogInIcon className='w-5 h-5' />
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
