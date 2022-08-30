import React from 'react'
import 'normalize-css/normalize.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import IsAuthenticated from './Auth/IsAuthenticated'
import ContactsPage from './pages/ContactsPage'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import { AnimatePresence } from 'framer-motion'


const App: React.FC = () => {
  const location = useLocation()

  return (
      <AnimatePresence mode='sync'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<MainLayout />} >
            <Route element={<AuthPage />}>
              <Route index element={<SignInForm />} />
              <Route path='signup' element={<SignUpForm />} />
            </Route>
            <Route element={<IsAuthenticated />}>
              <Route path='contacts' element={<ContactsPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
  )
}

export default App