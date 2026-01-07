import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { NavItems } from './NavItems'
import { LogoutDialog } from './LogoutDialog'

export function MobileMenu({ isOpen, onClose }) {
  const { isAuthenticated, user, logout } = useAuth()

  const userInitials =
    user?.nombre && user?.apellido
      ? `${user.nombre.charAt(0).toUpperCase()}${user.apellido.charAt(0).toUpperCase()}`
      : 'U'

  const handleLinkClick = () => {
    if (isOpen) {
      onClose()
    }
  }

  return (
    <section
      className={`lg:hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-xs transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 left-0 right-0 bg-background/90 border-b backdrop-blur-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
              <h1 className="text-lg font-bold text-foreground">Vet Sync</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <nav className="flex justify-center">
            <NavItems onNavItemClick={handleLinkClick} />
          </nav>

          <div className="pt-6 border-t border-border/20">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <section className="flex flex-col">
                    <span className="font-semibold text-sm">{user?.nombre + ' ' + user?.apellido}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </section>
                </div>
                <LogoutDialog
                  onConfirm={() => {
                    onClose()
                    logout()
                  }}
                >
                  <button
                    className="text-sm text-muted-foreground hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    Cerrar sesión
                  </button>
                </LogoutDialog>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full transition-transform py-5">
                  <Link to="/login" onClick={handleLinkClick}>
                    Iniciar sesión
                  </Link>
                </Button>
                <Button asChild className="w-full transition-transform py-5">
                  <Link to="/register" onClick={handleLinkClick}>
                    Registrarse
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
