import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ServicesSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full flex flex-col overflow-hidden pt-0">
          {/* Imagen skeleton */}
          <div className="relative w-full aspect-video overflow-hidden">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

          <div className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              {/* Título */}
              <Skeleton className="h-6 w-3/4 mb-2" />
              {/* Descripción - dos líneas */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 hidden lg:block" />
              </div>
            </CardHeader>

            <CardContent className="mt-2">
              {/* Sección de duración y precio */}
              <div className="flex justify-between mb-4 bg-secondary px-8 py-3 rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>

              {/* Botón skeleton */}
              <Skeleton className="w-full h-9 rounded-md" />
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
