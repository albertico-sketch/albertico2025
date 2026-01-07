import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Image } from '@unpic/react'
import { useAppointments } from '@/hooks/useAppointments'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export function ServicesCard({ service }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { openForm } = useAppointments()
  const { isAuthenticated } = useAuth()

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleScheduleAppointment = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agendar una cita')
      return
    }
    openForm(service.id)
  }

  return (
    <Card key={service.id} className={`h-full flex flex-col overflow-hidden group ${service.img_url ? 'pt-0' : ''}`}>
      {service.img_url && !imageError && (
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          {/* Skeleton/placeholder mientras carga la imagen */}
          {!imageLoaded && <Skeleton className="w-full h-full rounded-none"></Skeleton>}
          <Image
            loading='lazy'
            src={service.img_url}
            alt={service.nombre}
            onLoad={handleImageLoad}
            onError={handleImageError}
            width={800}
            aspectRatio={16 / 9}
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-102 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold">{service.nombre}</CardTitle>
          <CardDescription className="line-clamp-2 text-md">{service.descripcion}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <section className="flex justify-between mb-4 bg-secondary px-8 py-3 rounded-md text-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm">Duración</p>
              <p className="font-semibold text-md">{service.duracion_estimada} min</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Precio</p>
              <p className="font-semibold text-md">${service.precio}</p>
            </div>
          </section>
          <Button
            onClick={handleScheduleAppointment}
            className="w-full bg-primary rounded-md hover:bg-primary/90 transition-colors text-sm md:text-md hover:cursor-pointer"
          >
            Agendar Cita
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}
