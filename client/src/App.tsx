import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import ProjectsPage from './pages/Projects'
import DashboardPage from './pages/Dashboard'
import SignUpPage from './pages/SignUp'
import SignInPage from './pages/SignIn'
import AboutPage from './pages/About'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
