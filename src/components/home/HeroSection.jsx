import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PawPrint, ArrowRight, CalendarPlus } from 'lucide-react'
import { Image } from '@unpic/react'
import heroImage from '@/assets/hero.webp'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function HeroSection() {
  const [imgLoaded, setImgLoaded] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <section className="w-full py-12 md:min-h-[85vh] px-4 sm:px-10 bg-background flex items-center justify-center md:mb-[10vh]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[6fr_4fr] gap-14 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 text-sm bg-primary/15">
              <PawPrint className="w-4 h-4 mr-1" />
              Plataforma Veterinaria Digital
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/85 mb-6 leading-tight">
              El cuidado de tus mascotas,
              <span className="text-primary block">simplificado.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Vet Sync conecta a dueños de mascotas con servicios veterinarios de calidad. Gestiona citas, historial
              médico y servicios en una sola plataforma.
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center lg:justify-start">
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild size="lg" className="text-base">
                  <Link to="/register">
                    Registrarse
                    <ArrowRight className="ml-1 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center lg:justify-start">
                <Button variant="outline" asChild size="lg" className="text-base">
                  <Link to="/mascotas">
                    Ver Mascotas
                    <PawPrint />
                  </Link>
                </Button>
                <Button asChild size="lg" className="text-base">
                  <Link to="/citas">
                    Agendar Cita
                    <CalendarPlus className="ml-1 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="relative flex justify-center items-center px-4 lg:px-0">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-full h-full bg-primary/20 rounded-3xl transform -rotate-1 lg:-rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
              {!imgLoaded && <Skeleton className="w-full h-full absolute inset-0 rounded-3xl" />}
              <Image
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                width={800}
                aspectRatio={3 / 2}
                src={heroImage}
                alt="Veterinaria cuidando a un perro"
                className={`relative w-full h-full rounded-3xl shadow-lg object-cover z-10 transform rotate-2 transition-transform duration-500 group-hover:rotate-0 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
