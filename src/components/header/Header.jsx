import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { NavItems } from './NavItems'
import { ModeToggle } from './mode-toggle.jsx'
import { UserNav } from './UserNav'

export function Header({ toggleMenu }) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlHeaderVisibility = () => {
      // Hide header on scroll down, show on scroll up
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlHeaderVisibility)

    return () => {
      window.removeEventListener('scroll', controlHeaderVisibility)
    }
  }, [lastScrollY])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/85 py-4 px-5 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop Layout */}
        <section className="hidden lg:flex items-center relative">
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-4">
              <img src={VetsyncLogo} className="w-10" alt="Vetsync Logo" />
              <h1 className="text-xl font-bold text-foreground">Vet Sync</h1>
            </Link>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <NavItems />
          </nav>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </section>

        {/* Mobile Layout */}
        <section className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
              <h1 className="text-lg font-bold text-foreground">Vet Sync</h1>
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent rounded-md transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="!w-5.5 !h-5.5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </header>
  )
}
