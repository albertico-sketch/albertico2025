import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle, Clock } from 'lucide-react'
import { generateTimeSlots } from '@/lib/utils'

export function TimeSelection({ control, errors, getValues, services, blockedSlots, loadingSlots }) {
  const selectedDate = getValues('fecha')
  const selectedServiceId = getValues('servicio_id')
  const selectedService = services.find((service) => service.id === Number(selectedServiceId))
  const duration = selectedService?.duracion_estimada || 30

  const availableSlots = generateTimeSlots(selectedDate, duration)
  const filteredSlots = availableSlots.filter((slot) => !blockedSlots.includes(slot))

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Selecciona el horario de tu cita</h3>

      <Controller
        name="hora_inicio"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="border rounded-md">
            {loadingSlots ? (
              <div className="flex items-center justify-center h-[120px] p-6">
                <LoaderCircle className="h-6 w-6 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Cargando horarios...</span>
              </div>
            ) : filteredSlots.length === 0 ? (
              <div className="flex items-center flex-col justify-center p-6 gap-4">
                <Clock className="w-10 h-10 text-muted-foreground" />
                <span className="text-sm text-center text-muted-foreground">
                  No hay horarios disponibles para la fecha seleccionada
                </span>
              </div>
            ) : (
              // SOLUCIÓN: Altura fija específica para el ScrollArea
              <ScrollArea className="h-[400px] md:h-[300px] w-full">
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={value === slot ? 'default' : 'outline'}
                        size="sm"
                        className="h-10 text-sm font-medium min-w-0 flex-shrink-0"
                        onClick={() => onChange(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      />
      {errors.hora_inicio && <p className="text-sm text-red-500 text-center">{errors.hora_inicio.message}</p>}
    </div>
  )
}
