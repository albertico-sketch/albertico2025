import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function PetsSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden relative p-3">
          {/* Menu de acciones skeleton */}
          <div className="absolute top-4 right-4">
            <Skeleton className="w-8 h-5 rounded-full" />
          </div>

          <CardContent className="flex lg:flex-row flex-col gap-3 lg:gap-6 p-2">
            {/* Desktop layout - Imagen grande */}
            <div className="hidden lg:flex items-center">
              <Skeleton className="w-40 h-40 rounded-full" />
            </div>

            {/* Mobile layout - Imagen pequeña con info */}
            <div className="flex lg:hidden items-center gap-4">
              <Skeleton className="w-22 h-22 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {/* Nombre de la mascota */}
                <Skeleton className="h-5 w-24 mb-2" />
                {/* Especie • Raza */}
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <article className="flex flex-col py-2 gap-5">
              {/* Desktop header - Solo visible en desktop */}
              <header className="hidden lg:block">
                {/* Nombre de la mascota */}
                <Skeleton className="h-6 w-28 mb-2" />
                {/* Especie • Raza */}
                <Skeleton className="h-4 w-36" />
              </header>

              {/* Información con iconos */}
              <div className="flex flex-wrap gap-2 px-1 lg:px-0 justify-between lg:justify-start">
                {/* Edad */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>

                {/* Sexo */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-14" />
                </div>

                {/* Dueño */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Badge de fecha de registro */}
              <div>
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            </article>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
