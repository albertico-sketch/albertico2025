import { MoreHorizontal, ArrowUpDown, CalendarX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { CancelDialog } from '@/components/appointments/CancelDialog'
import { Image } from '@unpic/react'

export const createColumns = (cancelAppointment) => [
  {
    accessorKey: 'nombre_mascota',
    header: 'Paciente',
    cell: ({ row }) => {
      const imgUrl = row.original.img_url
      const nombreMascota = row.getValue('nombre_mascota')
      return (
        <div className="flex items-center">
          {imgUrl && (
            <div className="mr-1.5 sm:mr-3 w-8 sm:w-11 rounded-full overflow-hidden">
              <Image
                loading='lazy'
                width={80}
                aspectRatio={1}
                src={imgUrl}
                alt={nombreMascota}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
          <span>{nombreMascota}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto font-medium"
        >
          Fecha
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fecha = row.getValue('fecha')
      const [year, month, day] = fecha.split('-').map(Number)
      const date = new Date(year, month - 1, day)

      const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      return <div className="font-medium">{formattedDate}</div>
    },
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue('fecha'))
      const dateB = new Date(b.getValue('fecha'))
      return dateB.getTime() - dateA.getTime()
    }
  },
  {
    accessorKey: 'hora_inicio',
    header: 'Hora',
    cell: ({ row }) => {
      const hora_inicio = row.getValue('hora_inicio')
      const [hours, minutes] = hora_inicio.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)

      const localTime = date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      return <div className="font-medium">{localTime}</div>
    }
  },
  {
    accessorKey: 'nombre_servicio',
    header: 'Servicio'
  },
  {
    accessorKey: 'nombre_profesional',
    header: 'Profesional'
  },
  {
    accessorKey: 'status',
    header: <div className="text-center">Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue('status')

      const statusColors = {
        Programada: 'text-blue-500 border-blue-500 dark:text-blue-400 dark:border-blue-400',
        Completada: 'text-green-600 border-green-600',
        Cancelada: 'text-red-600 border-red-600',
        Reprogramada: 'text-yellow-400 border-yellow-400',
        'No asistió': 'text-red-600 border-red-600',
        'En Curso': 'text-primary border-primary'
      }

      const colorClass = statusColors[status] || 'text-gray-500 border-gray-500'

      return (
        <div className="flex justify-center">
          <Badge variant="outline" className={`${colorClass} text-xs px-2 py-1`}>
            {status}
          </Badge>
        </div>
      )
    }
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const appointment = row.original
      const actionableStatuses = ['Programada', 'Reprogramada']
      const canPerformActions = actionableStatuses.includes(appointment.status)

      if (!canPerformActions) {
        return null
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <CancelDialog onConfirm={() => cancelAppointment(appointment.id)}>
              <DropdownMenuItem
                className="flex items-center !text-red-500 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <CalendarX className="h-4 w-4 mr-1 stroke-red-500" />
                Cancelar
              </DropdownMenuItem>
            </CancelDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
