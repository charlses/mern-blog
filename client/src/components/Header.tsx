import { Link, useLocation } from 'react-router-dom'

//ShadcnUI components
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { ModeToggle } from './theme/mode-toggle'

//Icons
import {
  Package2,
  Menu,
  Search,
  LogInIcon,
  Newspaper,
  ChevronDown,
  LogOutIcon
} from 'lucide-react'

import { useSelector } from 'react-redux'
import { RootState } from '../context/store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  const path = useLocation().pathname
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
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
            path === '/projects' ? 'text-foreground' : 'text-muted-foreground '
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
            path === '/services' ? 'text-foreground' : 'text-muted-foreground '
          }`}
        >
          Services
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              to='/'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>
                <SheetDescription>Acme Inc</SheetDescription>
              </span>
            </Link>

            <SheetTitle>
              <div className='flex my-2 border-b items-center justify-start py-2 gap-2'>
                <div className='bg-muted-foreground h-12 w-12 rounded-full flex items-center justify-center'>
                  DT
                </div>
                <div className='flex flex-col'>
                  <h3>Davit Tavadze</h3>
                  <p className='font-extralight text-xs'>
                    Check out your profile
                  </p>
                </div>
                <ChevronDown className='ml-4' />
              </div>
            </SheetTitle>
            <Link
              to='/'
              className={`hover:text-foreground ${
                path === '/' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to='/about'
              className={`hover:text-foreground ${
                path === '/about' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              About Us
            </Link>
            <Link
              to='/projects'
              className={`hover:text-foreground ${
                path === '/projects'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Projects
            </Link>
            <Link
              to='/blog'
              className={`hover:text-foreground ${
                path === '/blog' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Blog
            </Link>
            <Link
              to='/contact'
              className={`hover:text-foreground ${
                path === '/contact'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Contact
            </Link>
            <Link
              to='/services'
              className={`hover:text-foreground ${
                path === '/services'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Services
            </Link>
            <div className='flex flex-col gap-2'>
              <Link to='/sign-in' className=''>
                <Button
                  variant='outline'
                  className='flex gap-2 items-center justify-start w-full -ml-4 font-extralight'
                >
                  <LogInIcon className='w-5 h-5' />
                  Sign in
                </Button>
              </Link>
              <Link to='/sign-up' className=''>
                <Button className='flex gap-2 items-start justify-start w-full -ml-4 font-extralight'>
                  <Newspaper className='w-5 h-5' />
                  Sign up
                </Button>
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
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
                <Link to='/profile'>
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
              <DropdownMenuItem className='flex gap-2 font-extralight'>
                <LogOutIcon className='h-5 w-5' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
