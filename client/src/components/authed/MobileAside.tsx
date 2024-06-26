import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import { Button } from '../ui/button'
import { Home, LineChart, Newspaper, PanelLeft, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const AuthedMobileAside = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetTitle className='hidden'>Mobile nav</SheetTitle>
      <SheetDescription className='hidden'>Mobile navigation</SheetDescription>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            to='/dashboard'
            className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
          >
            <Home className='h-5 w-5' />
            Dashboard
          </Link>
          <Link
            to='/dashboard/blog-posts'
            className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
          >
            <Newspaper className='h-5 w-5' />
            Blog Posts
          </Link>

          <Link
            to='/dashboard/users'
            className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
          >
            <Users2 className='h-5 w-5' />
            Users
          </Link>
          <Link
            to='/dashboard/settings'
            className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
          >
            <LineChart className='h-5 w-5' />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default AuthedMobileAside
