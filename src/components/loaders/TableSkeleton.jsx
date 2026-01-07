import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, CalendarPlus } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

export function TableSkeleton({ rows = 5 }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="flex flex-col gap-5">
      {/* Header con controles */}
      <div className={`flex ${isMobile ? 'flex-col gap-6' : 'items-center'}`}>
        {/* Botón agendar cita en móvil */}
        {isMobile && (
          <Button variant="secondary" disabled className="bg-muted">
            Agendar Cita
            <CalendarPlus className="h-4 w-4" />
          </Button>
        )}

        <div className="flex items-center gap-2 w-full">
          {/* Input de búsqueda */}
          <div className={`relative ${isMobile ? 'flex-1' : 'w-sm'}`}>
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5" />
            <Input placeholder="Filtrar mascotas..." value="" disabled className="pr-10 bg-muted" />
          </div>

          {/* Botón agendar cita en desktop */}
          {!isMobile && (
            <Button variant="secondary" disabled className="bg-muted ml-auto">
              Agendar Cita
              <CalendarPlus className="h-4 w-4" />
            </Button>
          )}

          {/* Selector de columnas */}
          {!isMobile && (
            <Button variant="outline" disabled className="bg-muted">
              <SlidersHorizontal />
            </Button>
          )}
        </div>
      </div>

      {/* Tabla skeleton */}
      <div className="border rounded-md">
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              {/* Columna Paciente */}
              <TableHead className="px-2 sm:px-3">
                <Skeleton className="h-4 w-15" />
              </TableHead>
              {/* Columna Fecha - visible siempre */}
              <TableHead className="px-2 sm:px-3">
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableHead>
              {/* Columna Hora - oculta en móvil */}
              {!isMobile && (
                <TableHead className="px-2 sm:px-3">
                  <Skeleton className="h-4 w-12" />
                </TableHead>
              )}
              {/* Columna Servicio - oculta en móvil */}
              {!isMobile && (
                <TableHead className="px-2 sm:px-3">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
              )}
              {/* Columna Profesional - oculta en móvil */}
              {!isMobile && (
                <TableHead className="px-2 sm:px-3">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              )}
              {/* Columna Estado */}
              <TableHead className="px-2 sm:px-3 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-14" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                {/* Columna Paciente con imagen circular */}
                <TableCell className="py-3 px-1.5 sm:px-3">
                  <div className="flex items-center">
                    <div className="mr-1.5 sm:mr-3">
                      <Skeleton className="w-8 sm:w-11 h-8 sm:h-11 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                </TableCell>
                {/* Columna Fecha */}
                <TableCell className="py-3 px-1.5 sm:px-3">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                {/* Columna Hora - oculta en móvil */}
                {!isMobile && (
                  <TableCell className="py-3 px-1.5 sm:px-3">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                )}
                {/* Columna Servicio - oculta en móvil */}
                {!isMobile && (
                  <TableCell className="py-3 px-1.5 sm:px-3">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                )}
                {/* Columna Profesional - oculta en móvil */}
                {!isMobile && (
                  <TableCell className="py-3 px-1.5 sm:px-3">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                )}
                {/* Columna Estado con badge centrado */}
                <TableCell className="py-3 px-1.5 sm:px-3">
                  <div className="flex justify-center">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </TableCell>
                {/* Columna Acciones - oculta en móvil */}
                {!isMobile && (
                  <TableCell className="w-12 py-3 px-1.5 sm:px-3">
                    <Skeleton className="h-2 w-5 rounded-full" />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación skeleton */}
      <div className="flex items-center space-x-2 justify-end">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}
