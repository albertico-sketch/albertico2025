import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Login } from '@/views/auth/Login.jsx'
import { Register } from '@/views/auth/Register.jsx'
import { Header } from '@/components/header/Header.jsx'
import { MobileMenu } from '@/components/header/MobileMenu.jsx'
import { Home } from '@/views/Home.jsx'
import { Pets } from '@/views/Pets.jsx'
import { Appointments } from '@/views/Appointments.jsx'
import { NewAppointment } from '../views/NewAppointment'
import { Services } from '@/views/Services.jsx'
import { NotFound } from '@/views/NotFound.jsx'

function AppContent() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const authPaths = ['/login', '/register', '*']
  const isAuthPath = authPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isAuthPath && (
        <>
          <Header toggleMenu={toggleMenu} />
          <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </>
      )}
      <main className={`flex-grow ${isAuthPath ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mascotas" element={<Pets />} />
          <Route path="/citas" element={<Appointments />} />
          <Route path="/agendar" element={<NewAppointment />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
