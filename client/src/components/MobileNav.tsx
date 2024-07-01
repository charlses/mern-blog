import { Link, useLocation } from 'react-router-dom'

//icons
import { LogInIcon, Menu, Newspaper, Package2 } from 'lucide-react'

//buttons
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

const MobileNav = () => {
  const path = useLocation().pathname
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <SheetTitle className='hidden'>
            <span className='sr-only'>Toggle navigation menu</span>
          </SheetTitle>
        </Button>
      </SheetTrigger>
      <SheetTitle className='hidden'>Mobile nav</SheetTitle>
      <SheetDescription className='hidden'>Mobile navigation</SheetDescription>
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
              path === '/projects' ? 'text-foreground' : 'text-muted-foreground'
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
              path === '/contact' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Contact
          </Link>
          <Link
            to='/services'
            className={`hover:text-foreground ${
              path === '/services' ? 'text-foreground' : 'text-muted-foreground'
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
  )
}

export default MobileNav
