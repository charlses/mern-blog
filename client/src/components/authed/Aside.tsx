import { Home, LineChart, Newspaper, Settings, Users2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

const Aside = () => {
  const path = useLocation().pathname
  return (
    <aside className='fixed inset-y-0 left-0 z-9 hidden w-14 flex-col border-r bg-background sm:flex mt-16'>
      <TooltipProvider>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard'
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  path === '/dashboard'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Home className='h-5 w-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard/blog-posts'
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  path === '/dashboard/blog-posts'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Newspaper className='h-5 w-5' />
                <span className='sr-only'>Blog Posts</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Blog Posts</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard/users'
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  path === '/dashboard/users'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Users2 className='h-5 w-5' />
                <span className='sr-only'>Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Users</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard/analytics'
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  path === '/dashboard/analytics'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <LineChart className='h-5 w-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard/settings'
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  path === '/dashboard/settings'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  )
}

export default Aside
