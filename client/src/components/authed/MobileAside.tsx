import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Home,
  LineChart,
  Newspaper,
  PanelLeft,
  Settings,
  Users2
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const AuthedMobileAside = () => {
  const path = useLocation().pathname
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
            className={`flex items-center gap-4 px-2.5 ${
              path === '/dashboard'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            <Home className='h-5 w-5' />
            Dashboard
          </Link>
          <Link
            to='/dashboard/blog-posts'
            className={`flex items-center gap-4 px-2.5 ${
              path === '/dashboard/blog-posts'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            <Newspaper className='h-5 w-5' />
            Blog Posts
          </Link>

          <Link
            to='/dashboard/users'
            className={`flex items-center gap-4 px-2.5 ${
              path === '/dashboard/users'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            <Users2 className='h-5 w-5' />
            Users
          </Link>
          <Link
            to='/dashboard/analytics'
            className={`flex items-center gap-4 px-2.5 ${
              path === '/dashboard/analytics'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            <LineChart className='h-5 w-5' />
            Analytics
          </Link>
          <Link
            to='/dashboard/settings'
            className={`flex items-center gap-4 px-2.5 ${
              path === '/dashboard/settings'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            <Settings className='h-5 w-5' />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default AuthedMobileAside
