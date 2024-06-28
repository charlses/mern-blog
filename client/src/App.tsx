import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Theme context
import { ThemeProvider } from './components/theme/theme-provider'

//Pages
import HomePage from './pages/Home'
import ProjectsPage from './pages/Projects'
import DashboardPage from './pages/Dashboard'
import SignUpPage from './pages/SignUp'
import SignInPage from './pages/SignIn'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import ServicesPage from './pages/Services'
import BlogPage from './pages/Blog'
import ProfilePage from './pages/Profile'

//Global components
import Header from './components/Header'
import SettingsPage from './pages/Settings'
import { Toaster } from './components/ui/sonner'
import PrivateRoute from './context/private/PrivateRoute'
import PublicRoute from './context/public/PublicRoute'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <Header />
        <Routes>
          {/* Authentication pages */}
          <Route element={<PublicRoute />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/dashboard/profile' element={<ProfilePage />} />
            <Route path='/dashboard/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
