import { Link } from 'react-router-dom'

//ShadcnUI components
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
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
import { Package2, Menu, Search, CircleUser, DoorOpen } from 'lucide-react'

const Header = () => {
  const isAuthed = false

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
          className='text-foreground transition-colors hover:text-foreground'
        >
          About
        </Link>
        <Link
          to='/projects'
          className='text-muted-foreground transition-colors hover:text-foreground'
        >
          Projects
        </Link>
        <Link
          to='/blog'
          className='text-muted-foreground transition-colors hover:text-foreground'
        >
          Blog
        </Link>
        <Link
          to='/contact'
          className='text-muted-foreground transition-colors hover:text-foreground'
        >
          Contact
        </Link>
        <Link
          to='/services'
          className='text-muted-foreground transition-colors hover:text-foreground'
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
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link to='/' className='hover:text-foreground'>
              Home
            </Link>
            <Link
              to='/about'
              className='text-muted-foreground hover:text-foreground'
            >
              About Us
            </Link>
            <Link
              to='/projects'
              className='text-muted-foreground hover:text-foreground'
            >
              Projects
            </Link>
            <Link
              to='/blog'
              className='text-muted-foreground hover:text-foreground'
            >
              Blog
            </Link>
            <Link
              to='/contact'
              className='text-muted-foreground hover:text-foreground'
            >
              Contact
            </Link>
            <Link
              to='/services'
              className='text-muted-foreground hover:text-foreground'
            >
              Services
            </Link>
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
        {isAuthed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <Link to='/profile'>My Account</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to='/sign-in'>
            <Button
              variant='outline'
              className='flex gap-2 items-center justify-center'
            >
              <DoorOpen className='w-6 h-6 font-extralight' />
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
